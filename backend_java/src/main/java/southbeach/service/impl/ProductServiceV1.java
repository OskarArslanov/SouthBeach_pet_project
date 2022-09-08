package southbeach.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import southbeach.exceptions.ProductAlreadyExistException;
import southbeach.exceptions.ProductNotFoundException;
import southbeach.model.product.Product;
import southbeach.model.product.ProductDTO;
import southbeach.model.product.Type;
import southbeach.model.user.User;
import southbeach.repository.ProductRepository;
import southbeach.repository.UserRepository;
import southbeach.service.ProductService;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
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
    public List<Product> getAllProducts(Map<String, String> params) throws RuntimeException {
        if (params != null) {
            Set<Type> types = Stream.of(params.get("types").split(","))
                                    .map(type -> Type.builder().type(type).build())
                                    .collect(Collectors.toSet());
            types.forEach(x -> System.out.println(x.getType()));

        }

        var products = productRepository.findAll();
        products.forEach(System.out::println);
        System.out.println("products : " + products.size());
        if (products.size() == 0) throw new RuntimeException();
        return products;
    }
}
