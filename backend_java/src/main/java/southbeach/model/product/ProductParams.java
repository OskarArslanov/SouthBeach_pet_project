package southbeach.model.product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Setter
@Getter
@ToString
public class ProductParams {
    private String name;
    private String availableAmount;
    private Range hourCost;
    private Range dayCost;
    private Range weekCost;
    private Range monthCost;

    @AllArgsConstructor
    @ToString
    @Getter
    public class Range {
        private String min;
        private String max;
    }
}
