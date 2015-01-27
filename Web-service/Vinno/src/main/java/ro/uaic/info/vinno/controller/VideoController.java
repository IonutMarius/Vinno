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

import ro.uaic.info.vinno.bean.ResponseBody;
import ro.uaic.info.vinno.bean.Video;
import ro.uaic.info.vinno.dao.VideoDao;

@RestController
@RequestMapping(value = "/vinno/videos")
public class VideoController {

	@Autowired
	private VideoDao videoDao;	
	
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public ResponseBody<Long> addVideo(@RequestBody Video video, HttpSession httpSession){
		ResponseBody<Long> respBody = null;
		
		Long videoId = null;
		String msg;
		try {
			videoId = this.videoDao.save(video).getId();
			msg = "Success";
		} catch (RollbackException e) {
			e.printStackTrace();
			msg = "Video already added";
		}
		respBody = new ResponseBody<Long>(videoId, msg);
		
		return respBody;
	}
	
	@RequestMapping(value = "/get/{userId}", method = RequestMethod.GET)
	public ResponseBody<List<Video>> getVideos(@PathVariable(value = "userId") Long userId){
		ResponseBody<List<Video>> respBody = null;
		
		List<Video> videos = videoDao.get(userId);
		respBody = new ResponseBody<List<Video>>(videos, "All videos");
		
		return respBody;
	}
}