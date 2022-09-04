package southbeach.model.user;

import lombok.Data;

@Data
public class RegistryRequest {

    private LoginInfoData loginInfoData;
    private UserInfoData userInfoData;
}
