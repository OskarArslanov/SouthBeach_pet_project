package southbeach.controller.api;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;
import southbeach.exceptions.UserAlreadyExistException;
import southbeach.model.secured.JwtRefresh;
import southbeach.model.user.LoginInfoData;
import southbeach.model.user.RegistryRequest;
import southbeach.security.JwtProvider;
import southbeach.service.UserService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;

    private final UserService userService;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginInfoData loginInfoData) {
        try {
            String username = loginInfoData.getEmail();
            String password = loginInfoData.getPassword();
            log.info("username : '"+username+"' | password : '"+password+"'");
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username,
                                                                                       password));
            log.info("=======//email :'"+ loginInfoData.getEmail()+"' found//==========");
            var access_cookie = jwtProvider.createCookie(username, true);
            var refresh_cookie = jwtProvider.createCookie(username, false);
            log.info("============================//got cookies//==============================");
            return ResponseEntity.ok()
                                 .header(HttpHeaders.SET_COOKIE, access_cookie.toString())
                                 .header(HttpHeaders.SET_COOKIE, refresh_cookie.toString()).build();
        } catch (BadCredentialsException e) {
            log.info("=======//email '"+ loginInfoData.getEmail()+"' not found//=======");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (AuthenticationException e) {
            log.info("=======//auth exception//=======");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request) {
        try {
            log.info("===================//access_token start update//=========================");
            String token = jwtProvider.getTokenFromCookie("refresh_token", request.getCookies());
            log.info("=================//old access_token '"+token+"' update//===================");
            var access_token = jwtProvider.updateAccessCookie(token);
            log.info("======================//access_token updated//============================");
            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, access_token.toString()).build();
        } catch (NullPointerException e) {
            log.error("=====================//access_token update failed//=======================");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
    @PostMapping("/registration")
    public ResponseEntity<?> register(@RequestBody RegistryRequest request) {
        try {
            userService.registry(request);
            log.info("======================//user registered//============================");
            return ResponseEntity.ok().build();
        } catch (UserAlreadyExistException e) {
            log.error("=====================//user registration failed//=======================");
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        try {
            String username = jwtProvider.getUsernameFromCookies("access_token",
                                                                 request.getCookies());
            JwtRefresh refresh = userService.getUserSecByUsername(username).getJwtRefresh();
            refresh.setToken(null);
            refresh.setExpiresDate(null);
            userService.getUserSecByUsername(username).setJwtRefresh(refresh);
            var access_cookie = ResponseCookie.from("access_token", "")
                                              .path("/").httpOnly(true)
                                              .maxAge(0).build();
            var refresh_cookie = ResponseCookie.from("refresh_token", "")
                                               .path("/").httpOnly(true)
                                               .maxAge(0).build();
            return ResponseEntity.ok()
                                 .header(HttpHeaders.SET_COOKIE, access_cookie.toString())
                                 .header(HttpHeaders.SET_COOKIE, refresh_cookie.toString()).build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok().build();
//            return ResponseEntity.badRequest().build();
        }

    }

 }
