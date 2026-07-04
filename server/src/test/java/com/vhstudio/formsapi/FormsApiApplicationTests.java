package com.vhstudio.formsapi;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = {
	"spring.datasource.url=jdbc:h2:mem:forms_api_test;MODE=MySQL;DB_CLOSE_DELAY=-1",
	"spring.datasource.username=sa",
	"spring.datasource.password=",
	"spring.datasource.driver-class-name=org.h2.Driver",
	"spring.jpa.hibernate.ddl-auto=create-drop",
	"app.jwt.secret=test-development-secret-test-development-secret"
})
class FormsApiApplicationTests {

	@Test
	void contextLoads() {
	}

}
