package southbeach.model.user;

import lombok.Data;
import southbeach.model.secured.UserSec;

@Data
public class UserDTO {

    private String username;
    private String password;

    public static UserDTO from(UserSec userSec) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername(userSec.getUsername());
        return userDTO;
    }
}
