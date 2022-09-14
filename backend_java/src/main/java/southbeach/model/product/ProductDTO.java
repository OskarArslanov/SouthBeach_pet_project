package southbeach.model.product;

import lombok.Data;

import java.util.Set;

@Data
public class ProductDTO {

    private String name;
    private Set<Type> types;
    private String hourPrice;
    private String dayPrice;
    private String weekPrice;
    private String monthPrice;
    private String availableAmount;
    private String description;

    public static ProductDTO from(Product product) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setName(product.getName());
        productDTO.setTypes(product.getTypes());
        productDTO.setHourPrice(product.getHourPrice().toString());
        productDTO.setDayPrice(product.getDayPrice().toString());
        productDTO.setWeekPrice(product.getWeekPrice().toString());
        productDTO.setMonthPrice(product.getMonthPrice().toString());
        productDTO.setMonthPrice(product.getMonthPrice().toString());
        productDTO.setAvailableAmount(product.getAvailableAmount().toString());
        productDTO.setDescription(product.getDescription());
        return productDTO;
    }
}
