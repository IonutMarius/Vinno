package ro.uaic.info.vinno.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ro.uaic.info.vinno.bean.User;

public interface UserRepository extends JpaRepository<User, Long> {

	@Query("SELECT id FROM User WHERE username = :username")
	public Long find(@Param("username") String username);
}
