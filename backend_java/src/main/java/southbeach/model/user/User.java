package southbeach.model.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import southbeach.model.product.Product;
import southbeach.model.secured.UserSec;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "users")
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    private String firstname;
    private String lastname;
    private String parentname;
    private String phone;

    @JsonIgnore
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private UserSec userSec;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {CascadeType.ALL})
    @JoinTable(name = "user_product",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"))
    private Set<Product> products = new HashSet<>();

    public void addProduct(Product product) {
        this.products.add(product);
        product.getUsers().add(this);
    }

    public void removeProduct(Product product) {
        this.products.remove(product);
        product.getUsers().remove(this);
    }

    public static User from(UserInfoData userInfoData) {
        User user = new User();
        user.setFirstname(userInfoData.getFirstname());
        user.setLastname(userInfoData.getLastname());
        user.setParentname(userInfoData.getParentname());
        user.setPhone(userInfoData.getPhone());
        return user;
    }
}
