package southbeach.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import southbeach.exceptions.UserAlreadyExistException;
import southbeach.model.user.UserDTO;
import southbeach.model.user.User;
import southbeach.model.secured.UserSec;
import southbeach.model.user.UserInfo;
import southbeach.repository.UserRepository;
import southbeach.service.UserService;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceV1 implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User getUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findUserByUsername(username)
                             .orElseThrow(()->new UsernameNotFoundException(username))
                             .getUser();
    }

    @Override
    public UserSec getUserSecByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findUserByUsername(username)
                             .orElseThrow(()->new UsernameNotFoundException(username));
    }

    @Override
    public boolean registry(UserDTO userDTO, UserInfo userInfo) throws UserAlreadyExistException {
        String username = userDTO.getUsername();
        try {
            getUserSecByUsername(username);
            throw new UserAlreadyExistException(username);
        } catch (UsernameNotFoundException e) {
            UserSec userSec = new UserSec(userDTO.getUsername(),
                                          passwordEncoder.encode(userDTO.getPassword()),
                                          true, true,
                                          true, true, userDTO.getRole());
            userSec.setUser(User.from(userInfo));
            userRepository.save(userSec);
            return true;
        }
    }

    @Override
    public boolean delete(String username) throws UsernameNotFoundException {
        UserSec userSec = getUserSecByUsername(username);
        if (userSec ==  null) return  false;
        userSec.getUser().setProducts(null);
        userSec.setUser(null);
        userSec.setJwtRefresh(null);
        userRepository.delete(userSec);
        return true;
    }

    @Override
    public boolean update(UserSec userSec) throws UsernameNotFoundException {
        UserSec user = getUserSecByUsername(userSec.getUsername());
        if (user == null) return false;
        userRepository.save(userSec);
        return true;
    }
}
