package southbeach.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import southbeach.exceptions.ProductAlreadyExistException;
import southbeach.exceptions.ProductNotFoundException;
import southbeach.model.product.Product;
import southbeach.model.product.ProductDTO;
import southbeach.model.product.ProductFilter;
import southbeach.model.user.User;
import southbeach.repository.ProductRepository;
import southbeach.repository.UserRepository;
import southbeach.service.ProductService;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@Slf4j
public class ProductServiceV1 implements ProductService {
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    @Autowired
    public ProductServiceV1(UserRepository userRepository,
                            ProductRepository productRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }
    @Override
    public void addProduct(String username, ProductDTO productDTO) throws ProductAlreadyExistException,
                                                                            UsernameNotFoundException {
        String productName = productDTO.getName();
        User user = userRepository.findUserByUsername(username)
                                  .orElseThrow(() -> new UsernameNotFoundException(username)).getUser();
        Product product = getProducts(username).stream()
                             .filter(item -> item.getName().equals(productName))
                             .findFirst().orElse(null);
        if (product != null) throw new ProductAlreadyExistException(username, productName);
        product = Product.fromDTO(productDTO);
        user.addProduct(product);
        userRepository.save(user.getUserSec());
    }


    @Override
    public void removeProduct(String username, String name) throws UsernameNotFoundException,
                                                                    ProductNotFoundException {
        User user = userRepository.findUserByUsername(username)
                                  .orElseThrow(() -> new UsernameNotFoundException(username)).getUser();
        Product product = getProducts(username)
                .stream()
                .filter(item -> item.getName().equals(name))
                .findFirst()
                .orElseThrow(()-> new ProductNotFoundException(username, name));
        user.removeProduct(product);
        userRepository.save(user.getUserSec());
    }

    @Override
    public Set<Product> getProducts(String username) throws UsernameNotFoundException {
        return userRepository.findUserByUsername(username)
                             .orElseThrow(()->new UsernameNotFoundException(username))
                             .getUser().getProducts();
    }

    @Override
    public List<Product> getAllProducts(Map<String, String> params) {
        var name = ProductFilter.like(params.get("name"));
        var hour = ProductFilter.between("hourPrice",
                                         Double.parseDouble(params.get("hourPrice[min]")),
                                         Double.parseDouble(params.get("hourPrice[max]")));
        var day = ProductFilter.between("dayPrice",
                                        Double.parseDouble(params.get("dayPrice[min]")),
                                        Double.parseDouble(params.get("dayPrice[max]")));
        var week = ProductFilter.between("weekPrice",
                                         Double.parseDouble(params.get("weekPrice[min]")),
                                         Double.parseDouble(params.get("weekPrice[max]")));
        var month = ProductFilter.between("monthPrice",
                                          Double.parseDouble(params.get("monthPrice[min]")),
                                          Double.parseDouble(params.get("monthPrice[max]")));
        var available = ProductFilter.greaterOrEqual(params.get("availableAmount"));
        return productRepository.findAll(hour.and(day.and(week.and(month.and(name.and(available))))));
    }
}
