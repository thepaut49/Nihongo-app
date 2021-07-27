package com.thepaut49.nihongo.repository.user;

import java.util.Optional;

import com.thepaut49.nihongo.model.user.ERole;
import com.thepaut49.nihongo.model.user.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByName(ERole name);
}
