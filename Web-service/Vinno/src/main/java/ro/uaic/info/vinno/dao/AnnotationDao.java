package ro.uaic.info.vinno.dao;

import java.util.List;

import ro.uaic.info.vinno.bean.Annotation;

public interface AnnotationDao {
	Annotation save(Annotation annotation);
	void deleteAll(Long videoId);
	List<Annotation> getAll(Long userId, Long videoId);
}
