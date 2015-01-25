package ro.uaic.info.vinno.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ro.uaic.info.vinno.bean.LoginRequest;
import ro.uaic.info.vinno.bean.RegistrationRequest;
import ro.uaic.info.vinno.bean.ResponseBody;
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
	public ResponseEntity<ResponseBody<Long>> createUser(@RequestBody RegistrationRequest req) {
		User createdUser = null;
		ResponseEntity<ResponseBody<Long>> response = null;
		User newUser = null;
		Long nullLong = null;
		ResponseBody<Long> respBody = null;
		
		if(this.validateRegisterReq(req)){
			newUser = new User(req.getUsername(), req.getPassword());
		}
		else{ 
			respBody = new ResponseBody<Long>(nullLong, "Invalid request");
			response = new ResponseEntity<ResponseBody<Long>>(respBody, HttpStatus.BAD_REQUEST);
			return response;
		}
		
		try {
			createdUser = userDao.save(newUser);
			respBody = new ResponseBody<Long>(createdUser.getId(), "User created");
			response = new ResponseEntity<ResponseBody<Long>>(respBody, HttpStatus.CREATED);
		} catch (UserAlreadyExistsException e) {
			respBody = new ResponseBody<Long>(nullLong, "User already exists");
			response = new ResponseEntity<ResponseBody<Long>>(respBody, HttpStatus.CONFLICT);
		}
		return response;
	}
	
	@RequestMapping(value = "/services/login", method = RequestMethod.POST)
	public ResponseEntity<ResponseBody<Long>> login(@RequestBody LoginRequest req){
		ResponseEntity<ResponseBody<Long>> response = null;
		User user = null;
		Long nullLong = null;
		ResponseBody<Long> respBody = null;
		
		if(!this.validateLoginReq(req)){
			respBody = new ResponseBody<Long>(nullLong, "One of the fields is missing");
			response = new ResponseEntity<ResponseBody<Long>>(respBody, HttpStatus.BAD_REQUEST);
			return response;
		}
		
		try {
			user = userDao.get(req.getUsername());
			respBody = new ResponseBody<Long>(user.getId(), "Success");			
			response = new ResponseEntity<ResponseBody<Long>>(respBody, HttpStatus.OK);
		} catch (NullPointerException e) {
			respBody = new ResponseBody<Long>(nullLong, "Username or password invalid");
			response = new ResponseEntity<ResponseBody<Long>>(respBody, HttpStatus.BAD_REQUEST);
		}
		
		return response;
	}

	private boolean validateLoginReq(LoginRequest req){
		if(req.getPassword() == null || req.getPassword() == null){
			return false;
		}
		
		return true;
	}
	
	private boolean validateRegisterReq(RegistrationRequest req){
		if(req.getPassword() == null || req.getPasswordConf() == null || req.getUsername() == null){
			return false;
		}
		
		if(req.getPassword().equals(req.getPasswordConf())){
			return true;
		}
		else{
			return false;
		}
	}
}