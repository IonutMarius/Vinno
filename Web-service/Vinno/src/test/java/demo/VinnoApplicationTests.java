package demo;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import ro.uaic.info.vinno.VinnoApplication;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = VinnoApplication.class)
@WebAppConfiguration
public class VinnoApplicationTests {

	@Test
	public void contextLoads() {
	}

}
