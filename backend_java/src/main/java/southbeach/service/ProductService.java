package southbeach.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import southbeach.exceptions.ProductAlreadyExistException;
import southbeach.exceptions.ProductNotFoundException;
import southbeach.model.product.ProductDTO;
import southbeach.model.product.Product;

import java.util.List;
import java.util.Set;

public interface ProductService {

    void addProduct(String username, ProductDTO productDTO) throws ProductAlreadyExistException,
            UsernameNotFoundException;
    void removeProduct(String username, String name) throws UsernameNotFoundException,
                                                            ProductNotFoundException;
    List<ProductDTO> getProductDTOs(String username) throws UsernameNotFoundException;
    Set<Product> getProducts(String username) throws UsernameNotFoundException;

    List<ProductDTO> getAllProducts() throws RuntimeException;


}
