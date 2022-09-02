package southbeach.model.user;

import lombok.Data;

@Data
public class UserRegisterRequest {
    private UserDTO userDTO;
    private UserInfo userInfo;
}
