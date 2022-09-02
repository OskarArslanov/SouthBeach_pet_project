package southbeach.exceptions;

public class ConsumerNotFoundException extends Exception {
    public ConsumerNotFoundException(String consumerName) {
        super("consumer with name : " + consumerName + "not found");
    }
}
