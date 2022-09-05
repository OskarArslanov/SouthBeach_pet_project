package southbeach.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import southbeach.model.secured.JwtRefresh;
import southbeach.model.secured.UserSec;
import southbeach.model.user.User;
import southbeach.service.UserService;

import javax.annotation.PostConstruct;
import javax.servlet.http.Cookie;
import java.util.Arrays;
import java.util.Base64;
import java.util.Date;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtProvider {
    @Value("${jwt.refresh.expiration}")
    private Long refresh_expiration;
    @Value("${jwt.access.expiration}")
    private Long access_expiration;
    @Value("${jwt.access}")
    private String jwtSecret;

    private final UserDetailsService userDetailsService;
    private final UserService userService;

    @PostConstruct
    protected void init() {
        jwtSecret = Base64.getEncoder().encodeToString(jwtSecret.getBytes());
    }

    public Authentication getAuthentication(String token) {
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(getUsernameFromToken(token));
        return new UsernamePasswordAuthenticationToken(userDetails,"",
                                                       userDetails.getAuthorities());
    }

    public String getUsernameFromToken(String token) {
        String username =
                Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
        log.info("username from jwt : '"+username+"'");
        return username;
    }

    public ResponseCookie createCookie(String username, boolean isAccessCookie) {
        Date now = new Date();
        Date validityDate;
        String name;
        Long expiration;
        if (isAccessCookie) {
            expiration = access_expiration;
            name = "access_token";
        } else {
            expiration = refresh_expiration;
            name = "refresh_token";
        }
        validityDate = new Date(now.getTime() + expiration*1000);
        log.info(name+" valid to : "+validityDate);
        String token = Jwts.builder().setClaims(getUsernameClaims(username))
                                  .setIssuedAt(now).setExpiration(validityDate)
                                  .signWith(SignatureAlgorithm.HS256, jwtSecret).compact();
        if (!isAccessCookie) {
            UserSec userSec = userService.getUserSecByUsername(username);
            if (userSec.getJwtRefresh() == null) {
                System.out.println("jwt is null");
                JwtRefresh jwtRefresh = new JwtRefresh(userSec,validityDate, token);
                log.info(String.valueOf(token.length()));
                userSec.setJwtRefresh(jwtRefresh);
            } else {
                System.out.println("jwt refreshed");
                userSec.getJwtRefresh().setExpiresDate(validityDate);
                userSec.getJwtRefresh().setToken(token);
            }
            userService.update(userSec);
        }
        return ResponseCookie.from(name, token).path("/").httpOnly(true).maxAge(expiration).build();
    }

    public ResponseCookie updateAccessCookie(String refresh_token) throws UsernameNotFoundException {
        String username = getUsernameFromToken(refresh_token);
        UserSec userSec =  userService.getUserSecByUsername(username);
        boolean isTokenCorrect = userSec.getJwtRefresh().getToken().equals(refresh_token);
        log.info("is token correct : "+isTokenCorrect);
        boolean isTokenNotExpired = !userSec.getJwtRefresh().getExpiresDate().before(new Date());
        log.info("is token not expired : "+isTokenNotExpired);
        if (isTokenCorrect && isTokenNotExpired) {
            return createCookie(username, true);
        } else {
            throw new UsernameNotFoundException(username);
        }
    }

    private Claims getUsernameClaims(String username) throws UsernameNotFoundException {
        User user = userService.getUserByUsername(username);
        UserSec userSec = user.getUserSec();
        Claims claims = Jwts.claims().setSubject(username);
        claims.put("authorities", userSec.getAuthorities());
        return claims;
    }

    public String getTokenFromCookie(String name, Cookie[] cookies ) {
        return Arrays.stream(cookies).filter(cookie -> cookie.getName().equals(name))
                     .findFirst().orElse(null).getValue();
    }

    public String getUsernameFromCookies(String name, Cookie[] cookies) {
        String token = getTokenFromCookie(name, cookies);
        return getUsernameFromToken(token);
    }
}
