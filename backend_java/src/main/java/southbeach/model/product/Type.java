package southbeach.model.product;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Slf4j
@Getter
@Table(name = "types_of_products")
public class Type {
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    private String type;

    @JsonIgnore
    @ManyToMany(mappedBy = "types")
    private Set<Product> products = new HashSet<>();
}
