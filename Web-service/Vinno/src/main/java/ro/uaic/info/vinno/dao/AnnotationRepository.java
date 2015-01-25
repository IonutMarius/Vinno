package ro.uaic.info.vinno.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import ro.uaic.info.vinno.bean.Annotation;

public interface AnnotationRepository extends JpaRepository<Annotation, Long> {

}
