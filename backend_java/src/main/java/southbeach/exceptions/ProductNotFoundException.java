package southbeach.exceptions;

public class ProductNotFoundException extends Exception {
    public ProductNotFoundException(String username, String name) {
        super("Product '" + name + "' with owner name '" + username + "' not found");
    }
}
