import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class SimpleTest {

    @Test
    public void simpleTest(){
        int x = 13;
        int y = 10;
        Assertions.assertEquals(23, x+y);
    }
}
