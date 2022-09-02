package southbeach.model.product;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import southbeach.model.user.User;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    private String name;

    private Double hourPrice;
    private Double dayPrice;
    private Double weekPrice;
    private Double monthPrice;
    private Integer availableAmount;
    private String description;

    @JsonIgnore
    @ManyToMany(mappedBy = "products")
    private Set<User> users = new HashSet<>();

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @Fetch(value = FetchMode.SELECT)
    @JoinTable(name = "product_type",
            joinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "type_id", referencedColumnName = "id"))
    private Set<Type> types = new HashSet<>();

    public static Product fromDTO (ProductDTO productDTO) {
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setTypes(productDTO.getTypes());
        product.setAvailableAmount(product.getAvailableAmount());
        product.setDescription(productDTO.getDescription());
        product.setHourPrice(productDTO.getHourPrice());
        product.setDayPrice(productDTO.getDayPrice());
        product.setWeekPrice(productDTO.getWeekPrice());
        product.setMonthPrice(productDTO.getMonthPrice());
        return product;
    }
}
