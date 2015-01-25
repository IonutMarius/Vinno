package ro.uaic.info.vinno.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ro.uaic.info.vinno.bean.Annotation;
import ro.uaic.info.vinno.bean.LoginRequest;
import ro.uaic.info.vinno.bean.RegistrationRequest;
import ro.uaic.info.vinno.bean.ResponseBody;
import ro.uaic.info.vinno.bean.User;
import ro.uaic.info.vinno.bean.Video;
import ro.uaic.info.vinno.dao.AnnotationDao;
import ro.uaic.info.vinno.dao.UserDao;
import ro.uaic.info.vinno.dao.VideoDao;
import ro.uaic.info.vinno.exception.UserAlreadyExistsException;

@RestController
@RequestMapping(value = "/vinno")
public class VinnoController {

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private VideoDao videoDao;
	
	@Autowired
	private AnnotationDao annotationDao;

	@RequestMapping(value = "/user/register", method = RequestMethod.POST)
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
	
	@RequestMapping(value = "/user/login", method = RequestMethod.POST)
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
			httpSession.setAttribute("message", "mesaaaj");
		} else {
			respBody = new ResponseBody<Long>(nullLong, "Username or password invalid");
			response = new ResponseEntity<ResponseBody<Long>>(respBody, HttpStatus.OK);
		}
		
		return response;
	}
	
	@RequestMapping(value = "/videos/add", method = RequestMethod.POST)
	public ResponseEntity<ResponseBody<Long>> addVideo(@RequestBody Video video, HttpSession httpSession){
		ResponseEntity<ResponseBody<Long>> response = null;
		ResponseBody<Long> respBody = null;
		
		Long videoId = this.videoDao.save(video).getId();
		respBody = new ResponseBody<Long>(videoId, "Video saved");
		response = new ResponseEntity<ResponseBody<Long>>(respBody, HttpStatus.OK);
		
		return response;
	}
	
	@RequestMapping(value = "/annotations/add", method = RequestMethod.POST)
	public ResponseEntity<ResponseBody<Long>> addAnnotation(@RequestBody Annotation annotation, HttpSession httpSession){
		ResponseEntity<ResponseBody<Long>> response = null;
		ResponseBody<Long> respBody = null;
		
		Long annotationId = this.annotationDao.save(annotation).getId();
		respBody = new ResponseBody<Long>(annotationId, "Annotation saved");
		response = new ResponseEntity<ResponseBody<Long>>(respBody, HttpStatus.OK);
		
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