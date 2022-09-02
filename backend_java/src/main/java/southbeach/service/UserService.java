package southbeach.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import southbeach.exceptions.UserAlreadyExistException;
import southbeach.model.user.UserDTO;
import southbeach.model.user.User;
import southbeach.model.secured.UserSec;
import southbeach.model.user.UserInfo;

public interface UserService {

    User getUserByUsername(String username) throws UsernameNotFoundException;
    UserSec getUserSecByUsername(String username) throws UsernameNotFoundException;
    boolean registry(UserDTO userDTO, UserInfo userInfo) throws UserAlreadyExistException;
    boolean delete (String username) throws UsernameNotFoundException;

    boolean update(UserSec userSec) throws UsernameNotFoundException;


}
