package southbeach.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import southbeach.model.product.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Override
    List<Product> findAll();
}
