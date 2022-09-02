package southbeach.model.product;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Slf4j
@Getter
public enum Type {
    FOREST, MOUNT, RIVER, SEA, RENT;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    private String type;

    @ManyToMany(mappedBy = "types")
    private Set<Product> products = new HashSet<>();
}
