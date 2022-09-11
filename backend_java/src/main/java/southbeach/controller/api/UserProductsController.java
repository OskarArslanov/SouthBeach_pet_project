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
import southbeach.security.JwtProvider;
import southbeach.service.ProductService;

import javax.servlet.http.HttpServletRequest;


@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/profile/products")
public class UserProductsController {

    private final ProductService productService;
    private final JwtProvider jwtProvider;
    @GetMapping
    public ResponseEntity<?> getProducts(HttpServletRequest request) {
        try {
            String username = jwtProvider.getUsernameFromCookies("access_token", request.getCookies());
            return ResponseEntity.ok(productService.getProducts(username));
        } catch (UsernameNotFoundException e) {
            log.error("==================//username not found//===============");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PreAuthorize("hasAnyAuthority('PRODUCT_ADD', 'PRODUCT_EDIT', 'PRODUCT_DELETE')")
    @PostMapping
    public ResponseEntity<?> addProduct(@RequestBody ProductDTO productDTO, HttpServletRequest request) {
        try {
            String username = jwtProvider.getUsernameFromCookies("access_token", request.getCookies());
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
    public ResponseEntity<?> removeProduct(@RequestBody String name,
                                           HttpServletRequest request) {
        try {
            String username = jwtProvider.getUsernameFromCookies("access_token",
                                                                 request.getCookies());
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
