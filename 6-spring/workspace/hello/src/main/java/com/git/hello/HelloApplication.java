package com.git.hello;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//@SpringBootConfiguration : 의존성 주입(외부에서 객체생성해서 넣어주는거)을 할 수 있도록 함. 객체관리자를 생성 (IoC 컨테이너를 생성)
//@EnableAutoConfiguration : 사용하는 의존성에 따라서 자동으로 환경을 구성함
//  -> spring-boot-starter-web : 
//			-> embed Tomcat 웹서버를 구동함, 8080포트 응답대기
//			-> Dispatcher Servlet 객체를 생성함
//  -> spring-boot-devtools : 코드를 고치면 서버를 다시 구동해줌 -> build.gradle가면 써있음 메모해놨음
//@ComponentScan : 컴포넌트들을 검색하여(main클래스 동위/하위 패키지들에서*중요) 싱글턴으로 객체생성을 함
//	-> Spring Framework에서 컴포넌트(예-@Controller) 어노테이션이 있는 클래스들을 검색함
//  -> Spring Framework에서 싱글턴으로 객체를 생성함
// 싱글턴만드는법은 기본 생성자를 private로 만들고 getInstance로만생성?

@SpringBootApplication
public class HelloApplication {

	public static void main(String[] args) {

		SpringApplication.run(HelloApplication.class, args);
	}

}
