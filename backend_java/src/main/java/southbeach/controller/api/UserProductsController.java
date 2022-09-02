package southbeach.controller.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import southbeach.exceptions.ProductAlreadyExistException;
import southbeach.exceptions.ProductNotFoundException;
import southbeach.model.product.ProductDTO;
import southbeach.service.ProductService;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/users/profile/products/{username}")
public class UserProductsController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<?> getProducts(@PathVariable String username) {
        try {
            return ResponseEntity.ok(productService.getProducts(username));
        } catch (UsernameNotFoundException e) {
            log.error("==================//username not found//===============");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PreAuthorize("hasAnyAuthority('users:read', 'users:write')")
    @PostMapping
    public ResponseEntity<?> addProduct(@PathVariable String username,
                                        @RequestBody ProductDTO productDTO) {
        try {
            productService.addProduct(username, productDTO);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (UsernameNotFoundException e) {
            log.error("==================//username not found//===============");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (ProductAlreadyExistException e) {
            log.error("==================//product already exist//===============");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }



    @PreAuthorize("hasAnyAuthority('users:read', 'users:write')")
    @DeleteMapping
    public ResponseEntity<?> removeProduct(@PathVariable String username,
                                           @RequestBody String name) {
        try {
            System.out.println(username + " : " + name);
            productService.removeProduct(username, name);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (UsernameNotFoundException e) {
            log.error("==================//username not found//===============");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (ProductNotFoundException e) {
            log.error("==================//product not found//===============");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
