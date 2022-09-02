package southbeach.exceptions;

public class UserAlreadyExistException extends Exception {
    public UserAlreadyExistException(String username) {
        super("User with name '" + username + "' is already exist");
    }
}
