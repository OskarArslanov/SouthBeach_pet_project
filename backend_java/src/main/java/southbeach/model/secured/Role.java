package southbeach.model.secured;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
public enum Role {
    USER(Set.of(Authority.USERS_WRITE, Authority.USERS_READ)),
    MODERATOR(Set.of(Authority.USERS_WRITE, Authority.USERS_READ,
                     Authority.MODERATORS_WRITE, Authority.MODERATORS_READ));
    private final Set<Authority> authorities;

    public Set<SimpleGrantedAuthority> getGrantedAuthorities() {
        return getAuthorities().stream()
                               .map(authority -> new SimpleGrantedAuthority(authority.getAuthority()))
                               .collect(Collectors.toSet());
    }
}