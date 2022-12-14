package southbeach.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import southbeach.exceptions.ProductAlreadyExistException;
import southbeach.exceptions.ProductNotFoundException;
import southbeach.model.product.Product;
import southbeach.model.product.ProductDTO;

import java.util.List;
import java.util.Map;

public interface ProductService {

    void addProduct(String username, ProductDTO productDTO) throws ProductAlreadyExistException,
            UsernameNotFoundException;
    void removeProduct(String username, String name) throws UsernameNotFoundException,
                                                            ProductNotFoundException;

    List<Product> getAllProducts(Map<String, String> params);

    void updateProduct(String username, Long id, ProductDTO productDTO) throws ProductAlreadyExistException;


}
