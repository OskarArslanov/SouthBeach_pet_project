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
import southbeach.service.ProductService;
import southbeach.service.UserService;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class ProductServiceV1 implements ProductService {
    private final ProductRepository productRepository;
    private final UserService userService;
    @Autowired
    public ProductServiceV1(ProductRepository productRepository,
                            UserService userService) {
        this.productRepository = productRepository;
        this.userService = userService;
    }
    @Override
    public void addProduct(String username, ProductDTO productDTO) throws ProductAlreadyExistException,
                                                                            UsernameNotFoundException {
        String productName = productDTO.getName();
        User user = userService.getUserByUsername(username);
        Product product = user.getProducts().stream()
                              .filter(item -> item.getName().equals(productName))
                              .findFirst().orElse(null);
        if (product != null) throw new ProductAlreadyExistException(username, productName);
        product = Product.fromDTO(productDTO);
        user.addProduct(product);
        userService.update(user.getUserSec());
    }


    @Override
    public void removeProduct(String username, String name) throws UsernameNotFoundException,
                                                                    ProductNotFoundException {
        User user = userService.getUserByUsername(username);
        Product product = user.getProducts().stream()
                              .filter(item -> item.getName().equals(name))
                              .findFirst()
                              .orElseThrow(()-> new ProductNotFoundException(username, name));
        user.removeProduct(product);
        userService.update(user.getUserSec());
    }

    @Override
    public List<Product> getAllProducts(Map<String, String> params) {
        if (params.size() > 0) {
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
        return productRepository.findAll();
    }

    @Override
    public void updateProduct(String username, Long id, ProductDTO productDTO) throws ProductAlreadyExistException {
        User user = userService.getUserByUsername(username);
        String productName = productDTO.getName();
        Product product = productRepository.findById(id).get();
        if (!productName.equalsIgnoreCase(product.getName())) {
            Product sameProduct = user.getProducts().stream()
                                      .filter(item -> item.getName().equals(productName))
                                      .findFirst().orElse(null);
            if (sameProduct != null) throw new ProductAlreadyExistException(username, productName);
        }
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setTypes(productDTO.getTypes());
        product.setAvailableAmount(Integer.parseInt(productDTO.getAvailableAmount()));
        product.setHourPrice(Double.parseDouble(productDTO.getHourPrice()));
        product.setDayPrice(Double.parseDouble(productDTO.getDayPrice()));
        product.setWeekPrice(Double.parseDouble(productDTO.getWeekPrice()));
        product.setMonthPrice(Double.parseDouble(productDTO.getMonthPrice()));
    }
}
