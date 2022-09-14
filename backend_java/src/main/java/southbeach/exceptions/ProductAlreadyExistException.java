package southbeach.exceptions;

public class ProductAlreadyExistException extends Exception {
    public ProductAlreadyExistException(String owner, String product) {
        super(owner + " already has " + product);
    }
}
