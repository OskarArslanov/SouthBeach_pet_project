package southbeach.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import southbeach.model.product.Product;
import southbeach.model.product.Type;

import java.util.List;
import java.util.Set;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Override
    List<Product> findAll();

    @Query("select * from Product p where " +
            "p.hourPrice between ?1 and ?2 and " +
            "p.dayPrice between ?3 and ?4 and " +
            "p.weekPrice between ?5 and ?6 and " +
            "p.monthPrice between ?7 and ?8 and " +
            "p.availableAmount >= ?9 and " +
            "p.name like %?10% and " +
            "p.types in ?11")
    List<Product> findByCost(double minH, double maxH,
                             double minD, double maxD,
                             double minW, double maxW,
                             double minM, double maxM,
                             int availableAmount,
                             String name, Set<Type> types);
}
