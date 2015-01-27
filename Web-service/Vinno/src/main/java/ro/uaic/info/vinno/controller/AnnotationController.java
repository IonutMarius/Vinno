package ro.uaic.info.vinno.controller;

import java.util.List;

import javax.persistence.RollbackException;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	@RequestMapping(value = "/{userId}/{videoId}", method = RequestMethod.GET)
	public ResponseBody<List<Annotation>> getAnnotationByUserIdAndVideoId(@PathVariable(value = "userId") Long userId, @PathVariable(value = "videoId") Long videoId, HttpSession httpSession){
		ResponseBody<List<Annotation>> respBody = null;
		
		List<Annotation> annotations = null;
		String msg = "All annotations";
		
		annotations = this.annotationDao.getAll(userId, videoId);
		respBody = new ResponseBody<List<Annotation>>(annotations, msg);
		
		return respBody;
	}

	@RequestMapping(value = "/{annotationId}", method = RequestMethod.DELETE)
	public ResponseBody<Boolean> delete(@PathVariable(value = "annotationId") Long annotationId, HttpSession httpSession){
		ResponseBody<Boolean> respBody = null;		
		String msg = "Success";
		
		this.annotationDao.delete(annotationId);
		
		respBody = new ResponseBody<Boolean>(true, msg);
		
		return respBody;	
	}
}