package ro.uaic.info.vinno.dao;

import ro.uaic.info.vinno.bean.User;

public interface UserDao {
	User save(User user);
	Long get(String username);
}
