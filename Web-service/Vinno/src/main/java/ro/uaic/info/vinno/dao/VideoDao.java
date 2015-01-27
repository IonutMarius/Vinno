package ro.uaic.info.vinno.dao;

import java.util.List;

import ro.uaic.info.vinno.bean.Video;

public interface VideoDao {
	Video save(Video video);
	List<Video> get(Long userId);
	void delete(Long videoId);
}
