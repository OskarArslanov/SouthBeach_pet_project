package southbeach.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import southbeach.model.product.Type;

import java.util.List;

public interface ProductTypeRepository extends JpaRepository<Type, Long> {

    @Override
    List<Type> findAll();
}
