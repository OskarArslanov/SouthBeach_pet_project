package southbeach.security;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Slf4j
@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        log.info("FILTER REQUEST START : "+request.getRequestURL());
        Cookie _logged = new Cookie("_logged", "false");
        _logged.setHttpOnly(false);
        _logged.setMaxAge(10000000);
        try {
            Cookie[] cookies = request.getCookies();
            String access_token = jwtProvider.getTokenFromCookie("access_token", cookies);
            log.info("got access_token");
            validatingAccessCookie(access_token);
            _logged.setValue("true");
        } catch (Exception e) {
            log.error("auth cookies are null");
        }
        response.addCookie(_logged);
        filterChain.doFilter(request, response);
    }

    private void validatingAccessCookie(String token) {
        try {
            log.info("Start validating access_token");
            Authentication authentication = jwtProvider.getAuthentication(token);
            log.info("auth got for : '"+authentication.getName()+"'");
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.info("Finish validating access_token : Success");
        } catch (UsernameNotFoundException usernameNotFoundException) {
            log.error("username exception");
        } catch (ExpiredJwtException expiredJwtException) {
            log.error("expired exception");
        } catch (SignatureException signatureException) {
            log.error("signature exception");
        } catch (MalformedJwtException malformedJwtException) {
            log.error("malformed exception");
        } catch (IllegalArgumentException illegalArgumentException) {
            log.error("illegal argument exception");
        } catch (UnsupportedJwtException unsupportedJwtException) {
            log.error("unsupported exception");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
