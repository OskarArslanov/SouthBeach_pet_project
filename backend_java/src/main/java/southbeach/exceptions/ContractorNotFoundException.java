package southbeach.exceptions;

public class ContractorNotFoundException extends Exception {
    public ContractorNotFoundException(String contractorName) {
        super("contractor with name : " + contractorName + "not found");
    }
}
