package southbeach.controller.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import southbeach.model.user.User;
import southbeach.model.user.UserInfo;
import southbeach.service.UserService;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/users/{username}")
public class UserProfileController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<?> getUser(@PathVariable String username) {
        try {
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
    public ResponseEntity<?> update(@PathVariable String username,
                                    @RequestBody UserInfo userInfo) {
        try {
            User user = userService.getUserByUsername(username);
            user.setFirstname(userInfo.getFirstname());
            user.setLastname(userInfo.getLastname());
            user.setParentname(userInfo.getParentname());
            user.setPhone(userInfo.getPhone());
            user.setEmail(userInfo.getEmail());
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
    public ResponseEntity<?> deleteUser(@PathVariable String username) {
        try {
            userService.delete(username);
            log.info("==================//user deleted//===============");
            return ResponseEntity.ok().build();
        } catch (UsernameNotFoundException e) {
            log.error("==================//username not found//===============");
            return ResponseEntity.badRequest().build();
        }
    }
}
