package southbeach.model.product;

import lombok.Data;

import java.util.Set;

@Data
public class ProductDTO {

    private String name;
    private Set<Type> types;
    private Double hourPrice;
    private Double dayPrice;
    private Double weekPrice;
    private Double monthPrice;
    private Integer availableAmount;
    private String description;

    public static ProductDTO from(Product product) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setName(product.getName());
        productDTO.setTypes(product.getTypes());
        productDTO.setHourPrice(product.getHourPrice());
        productDTO.setDayPrice(product.getDayPrice());
        productDTO.setWeekPrice(product.getWeekPrice());
        productDTO.setMonthPrice(product.getMonthPrice());
        productDTO.setMonthPrice(product.getMonthPrice());
        productDTO.setAvailableAmount(product.getAvailableAmount());
        productDTO.setDescription(product.getDescription());
        return productDTO;
    }
}
