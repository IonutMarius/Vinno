package ro.uaic.info.vinno;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@ComponentScan
@EnableJpaRepositories(basePackages = {"ro.uaic.info.vinno"})
@SpringBootApplication
public class VinnoApplication {

    public static void main(String[] args) {
        SpringApplication.run(VinnoApplication.class, args);
    }
}
