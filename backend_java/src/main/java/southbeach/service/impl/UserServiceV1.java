package southbeach.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import southbeach.exceptions.UserAlreadyExistException;
import southbeach.model.secured.UserSec;
import southbeach.model.user.User;
import southbeach.model.user.UserRegisterRequest;
import southbeach.repository.RoleRepository;
import southbeach.repository.UserRepository;
import southbeach.service.UserService;

import java.util.Set;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceV1 implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
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
    public boolean registry(UserRegisterRequest request) throws UserAlreadyExistException {
        String username = request.getUserLoginRequest().getUsername();
        String password = request.getUserLoginRequest().getPassword();
        try {
            getUserSecByUsername(username);
            throw new UserAlreadyExistException(username);
        } catch (UsernameNotFoundException e) {
            UserSec userSec = new UserSec(username,
                                          passwordEncoder.encode(password),
                                          true, true,
                                          true, true);
            userSec.setRoles(Set.of(roleRepository.findByName("USER").get()));
            userSec.setUser(User.from(request.getUserInfo()));
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
