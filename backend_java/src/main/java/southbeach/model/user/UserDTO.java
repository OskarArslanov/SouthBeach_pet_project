package southbeach.model.user;

import lombok.Data;
import southbeach.model.secured.UserSec;

@Data
public class UserDTO {

    private String email;
    private String password;

    public static UserDTO from(UserSec userSec) {
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail(userSec.getUsername());
        return userDTO;
    }
}
