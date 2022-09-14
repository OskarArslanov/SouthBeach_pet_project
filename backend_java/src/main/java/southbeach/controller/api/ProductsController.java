package southbeach.controller.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import southbeach.repository.ProductTypeRepository;
import southbeach.service.ProductService;

import java.util.Map;

@RestController
@RequestMapping("/api/products")
@Slf4j
@RequiredArgsConstructor
public class ProductsController {

    private final ProductService productService;
    private final ProductTypeRepository productTypeRepository;

    @GetMapping
    public ResponseEntity<?> getAllProducts(Map<String, String> params) {
        try {
            return ResponseEntity.ok(productService.getAllProducts(params));
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/types")
    public ResponseEntity<?> getProductTypes() {
        try {
            return ResponseEntity.ok(productTypeRepository.findAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
