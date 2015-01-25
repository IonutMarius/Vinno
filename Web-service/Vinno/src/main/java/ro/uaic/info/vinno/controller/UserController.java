package ro.uaic.info.vinno.controller;

import javax.servlet.http.HttpSession;

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
@RequestMapping(value = "/vinno/users")
public class UserController {

	@Autowired
	private UserDao userDao;

	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<ResponseBody<Long>> registerUser(@RequestBody RegistrationRequest req, HttpSession httpSession) {
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
			response = new ResponseEntity<ResponseBody<Long>>(respBody, HttpStatus.OK);
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
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResponseEntity<ResponseBody<Long>> login(@RequestBody LoginRequest req, HttpSession httpSession){
		ResponseEntity<ResponseBody<Long>> response = null;
		User user = null;
		Long nullLong = null;
		ResponseBody<Long> respBody = null;
		
		if(!this.validateLoginReq(req)){
			respBody = new ResponseBody<Long>(nullLong, "One of the fields is missing");
			response = new ResponseEntity<ResponseBody<Long>>(respBody, HttpStatus.OK);
			return response;
		}
		
		user = userDao.get(req.getUsername());
		
		if(user != null && user.getPassword().equals(req.getPassword())){
			respBody = new ResponseBody<Long>(user.getId(), "Success");			
			response = new ResponseEntity<ResponseBody<Long>>(respBody, HttpStatus.OK);
		} else {
			respBody = new ResponseBody<Long>(nullLong, "Username or password invalid");
			response = new ResponseEntity<ResponseBody<Long>>(respBody, HttpStatus.OK);
		}
		
		return response;
	}
	
	@RequestMapping(value = "/logout", method = RequestMethod.POST)
	public ResponseEntity<ResponseBody<Boolean>> logout(HttpSession httpSession){
		ResponseEntity<ResponseBody<Boolean>> response = null;
		ResponseBody<Boolean> respBody = null;
		
		httpSession.invalidate();
		
		respBody = new ResponseBody<Boolean>(true, "Success");
		response = new ResponseEntity<ResponseBody<Boolean>>(respBody, HttpStatus.OK);
		
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