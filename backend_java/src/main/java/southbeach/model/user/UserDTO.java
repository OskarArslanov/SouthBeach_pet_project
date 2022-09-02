package southbeach.model.user;

import southbeach.model.secured.Role;
import southbeach.model.secured.UserSec;
import lombok.Data;

@Data
public class UserDTO {

    private String username;
    private String password;
    private Role role;

    public static UserDTO from(UserSec userSec) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername(userSec.getUsername());
        userDTO.setRole(userSec.getRole());
        return userDTO;
    }
}
