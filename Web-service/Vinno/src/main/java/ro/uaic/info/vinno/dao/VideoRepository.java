package ro.uaic.info.vinno.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ro.uaic.info.vinno.bean.Video;

public interface VideoRepository extends JpaRepository<Video, Long>{

	@Query("SELECT v FROM Video v WHERE v.userId = :userId")
	public List<Video> findByUserId(@Param("userId") Long userId);
}
