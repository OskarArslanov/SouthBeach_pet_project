package southbeach.model.secured;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "authorities")
public class Authority implements GrantedAuthority {
    @Id
    @Column(name = "id")
    private Long id;

    private String authority;

    @JsonIgnore
    @ManyToMany(mappedBy = "authorities")
    private Set<Role> roles = new HashSet<>();

    @Override
    public String getAuthority() {
        return authority;
    }
}