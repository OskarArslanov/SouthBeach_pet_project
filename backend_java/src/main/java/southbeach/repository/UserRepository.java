package southbeach.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import southbeach.model.secured.UserSec;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserSec, Long> {

    Optional<UserSec> findUserByUsername(String username);
}
