package southbeach.model.secured;

import org.springframework.security.core.GrantedAuthority;

public enum Authority implements GrantedAuthority {
    USERS_READ("users:read"),
    USERS_WRITE("users:write"),
    MODERATORS_READ("moderators:read"),
    MODERATORS_WRITE("moderators:write");

    private final String authority;

    Authority(String authority) {
        this.authority = authority;
    }
    public String getAuthority() {
        return authority;
    }
}
