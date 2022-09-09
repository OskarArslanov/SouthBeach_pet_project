package southbeach.model.product;

import org.springframework.data.jpa.domain.Specification;

public class ProductFilter {
    public static Specification<Product> like(String name) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like( // search candidates
                criteriaBuilder.upper(root.get("name")), // in upper case column
                "%"+name.toUpperCase()+"%");// in upper case input
    }

    public static Specification<Product> between(String column, double min, double max) {
        return ((root, query, criteriaBuilder) -> criteriaBuilder.between(root.get(column), min, max));
    }

    public static Specification<Product> greaterOrEqual(String value) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.greaterThanOrEqualTo(root.get(
                "availableAmount"), value.equals("") ? 0 : Integer.parseInt(value));
    }
}
