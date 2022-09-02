package southbeach.model.secured;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "refresh_token")
@NoArgsConstructor
public class JwtRefresh {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "jwtRefresh")
    private UserSec userSec;

    private Date expiresDate;
    @Column(unique = true, length = 1024)
    private String token;

    public JwtRefresh(UserSec userSec, Date expiresDate, String token) {
        this.userSec = userSec;
        this.expiresDate = expiresDate;
        this.token = token;
    }
}