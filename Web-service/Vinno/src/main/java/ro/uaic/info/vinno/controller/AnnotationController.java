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
import ro.uaic.info.vinno.bean.ResponseBody;
import ro.uaic.info.vinno.dao.AnnotationDao;

@RestController
@RequestMapping(value = "/vinno/annotations")
public class AnnotationController {

	@Autowired
	private AnnotationDao annotationDao;
	
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public ResponseEntity<ResponseBody<Long>> addAnnotation(@RequestBody Annotation annotation, HttpSession httpSession){
		ResponseEntity<ResponseBody<Long>> response = null;
		ResponseBody<Long> respBody = null;
		
		Long annotationId = this.annotationDao.save(annotation).getId();
		respBody = new ResponseBody<Long>(annotationId, "Annotation saved");
		response = new ResponseEntity<ResponseBody<Long>>(respBody, HttpStatus.OK);
		
		return response;
	}
}