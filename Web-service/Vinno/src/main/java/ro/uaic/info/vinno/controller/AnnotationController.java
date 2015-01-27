package ro.uaic.info.vinno.controller;

import javax.persistence.RollbackException;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
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
	public ResponseBody<Long> addAnnotation(@RequestBody Annotation annotation, HttpSession httpSession){
		ResponseBody<Long> respBody = null;
		
		Long annotationId = null;
		String msg;
		try {
			annotationId = this.annotationDao.save(annotation).getId();
			msg = "Success";
		} catch (RollbackException e) {
			e.printStackTrace();
			msg = "Annotation already added";
		}
		respBody = new ResponseBody<Long>(annotationId, msg);
		
		return respBody;
	}
}