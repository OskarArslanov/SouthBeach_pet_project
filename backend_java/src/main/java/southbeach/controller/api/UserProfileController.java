package southbeach.controller.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import southbeach.model.user.User;
import southbeach.model.user.UserInfoData;
import southbeach.security.JwtProvider;
import southbeach.service.UserService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/profile")
public class UserProfileController {
    private final UserService userService;
    private final JwtProvider jwtProvider;

    @GetMapping
    public ResponseEntity<?> getUser(HttpServletRequest request) {
        try {
            String username = jwtProvider.getUsernameFromCookies("access_token",
                                                                 request.getCookies());
            User user = userService.getUserByUsername(username);
            log.info("==================//user got//===============");
            return ResponseEntity.ok(user);
        } catch (UsernameNotFoundException e) {
            log.error("==================//username not found//===============");
            return ResponseEntity.notFound().build();
        }
    }
    @PreAuthorize("hasAnyAuthority('users:read', 'users:write')")
    @PutMapping
    public ResponseEntity<?> update(@RequestBody UserInfoData userInfoData,
                                    HttpServletRequest request) {
        try {
            String username = jwtProvider.getUsernameFromCookies("access_token",
                                                                 request.getCookies());
            User user = userService.getUserByUsername(username);
            user.setFirstname(userInfoData.getFirstname());
            user.setLastname(userInfoData.getLastname());
            user.setParentname(userInfoData.getParentname());
            user.setPhone(userInfoData.getPhone());
            userService.update(user.getUserSec());
            log.info("==================//user updated//===============");
            return ResponseEntity.ok(user);
        } catch (UsernameNotFoundException e) {
            log.error("==================//username not found//===============");
            return ResponseEntity.badRequest().build();
        }
    }
    @PreAuthorize("hasAnyAuthority('users:read', 'users:write')")
    @DeleteMapping
    public ResponseEntity<?> deleteUser(HttpServletRequest request) {
        try {
            String username = jwtProvider.getUsernameFromCookies("access_token",
                                                                 request.getCookies());
            userService.delete(username);
            log.info("==================//user deleted//===============");
            return ResponseEntity.ok().build();
        } catch (UsernameNotFoundException e) {
            log.error("==================//username not found//===============");
            return ResponseEntity.badRequest().build();
        }
    }
}
