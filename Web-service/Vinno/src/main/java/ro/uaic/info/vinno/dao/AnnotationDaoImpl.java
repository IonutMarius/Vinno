package ro.uaic.info.vinno.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Repository;

import ro.uaic.info.vinno.bean.Annotation;

@Repository
@Transactional
public class AnnotationDaoImpl implements AnnotationDao{

	@Autowired
	private AnnotationRepository repository;
	
	@Override
	public Annotation save(Annotation annotation) {
		Annotation createdAnnotation = null;
		
		try{
			createdAnnotation = repository.save(annotation);
		}
		catch(DataIntegrityViolationException e){
			e.printStackTrace();
		}
		
		return createdAnnotation;
	}

	@Override
	public void deleteAll(Long videoId) {
		this.repository.clearAnnotations(videoId);		
	}

	@Override
	public List<Annotation> getAll(Long userId, Long videoId) {
		return this.repository.getByUserIdAndVideoId(userId, videoId);
	}

}
