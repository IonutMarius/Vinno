package ro.uaic.info.vinno.dao;

import java.util.ArrayList;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Repository;

import ro.uaic.info.vinno.bean.User;
import ro.uaic.info.vinno.exception.UserAlreadyExistsException;

@Repository
@Transactional
public class UserDaoImp implements UserDao {
	
	@Autowired
	private UserRepository repository;
	
	@Override
	public User save(User user) throws UserAlreadyExistsException {
		User createdUser = null;
		try {
			 createdUser = repository.save(user);
		} catch (DataIntegrityViolationException e) {
			throw new UserAlreadyExistsException();
		}
		return createdUser;
	}

	@Override
	public User get(String username) {
		ArrayList<User> allUsers = null;
		
		allUsers = (ArrayList<User>) repository.findAll();
		
		for(User user : allUsers){
			if(user.getUsername().equals(username)){
				return user;
			}
		}
		
		return null;
	}

}
