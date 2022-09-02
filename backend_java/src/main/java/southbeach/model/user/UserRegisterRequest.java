package southbeach.model.user;

import lombok.Data;

@Data
public class UserRegisterRequest {
    private UserLoginRequest userLoginRequest;
    private UserInfo userInfo;
}
