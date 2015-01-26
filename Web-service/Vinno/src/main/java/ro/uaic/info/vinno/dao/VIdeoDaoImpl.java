package ro.uaic.info.vinno.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Repository;

import ro.uaic.info.vinno.bean.Video;

@Repository
@Transactional
public class VIdeoDaoImpl implements VideoDao {

	@Autowired
	private VideoRepository repository;
	
	@Override
	public Video save(Video video) {
		Video createdVideo = null;
		
		try{
			createdVideo = repository.save(video);
		}
		catch(DataIntegrityViolationException e){
			e.printStackTrace();
		}
		
		return createdVideo;
	}

	@Override
	public List<Video> get(Long userId) {
		List<Video> videos = null;
		
		videos = repository.findByUserId(userId);
		
		return videos;
	}

}
