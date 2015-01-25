package ro.uaic.info.vinno.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import ro.uaic.info.vinno.bean.Video;

public interface VideoRepository extends JpaRepository<Video, Long>{

}
