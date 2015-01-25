package ro.uaic.info.vinno.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	public ResponseEntity<ResponseBody<Long>> addVideo(@RequestBody Video video, HttpSession httpSession){
		ResponseEntity<ResponseBody<Long>> response = null;
		ResponseBody<Long> respBody = null;
		
		Long videoId = this.videoDao.save(video).getId();
		respBody = new ResponseBody<Long>(videoId, "Video saved");
		response = new ResponseEntity<ResponseBody<Long>>(respBody, HttpStatus.OK);
		
		return response;
	}
}