package ro.uaic.info.vinno.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ro.uaic.info.vinno.bean.User;
import ro.uaic.info.vinno.dao.UserDao;
import ro.uaic.info.vinno.exception.UserAlreadyExistsException;

@RestController
@RequestMapping(value = "/vinno")
public class VinnoController {

	@Autowired
	private UserDao userDao;

	@RequestMapping(value = "/hello", method = RequestMethod.GET)
	public String hello(){
		return "Hello";
	}

	@RequestMapping(value = "/services/register", method = RequestMethod.POST)
	public ResponseEntity<Long> createUser(@RequestBody User user) {
		User createdUser = null;
		ResponseEntity<Long> response = null;
		try {
			createdUser = userDao.save(user);
			response = new ResponseEntity<Long>(createdUser.getId(), HttpStatus.CREATED);
		} catch (UserAlreadyExistsException e) {
			Long nullLong = null;
			response = new ResponseEntity<Long>(nullLong, HttpStatus.CONFLICT);
		}
		return response;
	}

}