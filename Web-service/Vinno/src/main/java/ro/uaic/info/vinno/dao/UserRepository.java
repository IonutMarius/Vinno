package ro.uaic.info.vinno.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import ro.uaic.info.vinno.bean.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
