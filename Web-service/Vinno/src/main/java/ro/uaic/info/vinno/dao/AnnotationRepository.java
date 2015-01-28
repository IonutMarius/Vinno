package ro.uaic.info.vinno.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ro.uaic.info.vinno.bean.Annotation;

public interface AnnotationRepository extends JpaRepository<Annotation, Long> {
	
	@Modifying  
	@Query("DELETE FROM Annotation a WHERE a.videoId = :videoId")
	public void clearAnnotations(@Param("videoId") Long videoId);
	
	@Query("SELECT a FROM Annotation a WHERE a.userId = :userId AND a.videoId = :videoId")
	public List<Annotation> getByUserIdAndVideoId(@Param("userId") Long userId, @Param("videoId") Long videoId);
}
