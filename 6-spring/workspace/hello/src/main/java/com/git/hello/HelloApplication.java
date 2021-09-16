package com.git.hello;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//@SpringBootConfiguration : ������ ����(�ܺο��� ��ü�����ؼ� �־��ִ°�)�� �� �� �ֵ��� ��. ��ü�����ڸ� ���� (IoC �����̳ʸ� ����)
//@EnableAutoConfiguration : ����ϴ� �������� ���� �ڵ����� ȯ���� ������
//  -> spring-boot-starter-web : 
//			-> embed Tomcat �������� ������, 8080��Ʈ ������
//			-> Dispatcher Servlet ��ü�� ������
//  -> spring-boot-devtools : �ڵ带 ��ġ�� ������ �ٽ� �������� -> build.gradle���� ������ �޸��س���
//@ComponentScan : ������Ʈ���� �˻��Ͽ�(mainŬ���� ����/���� ��Ű���鿡��*�߿�) �̱������� ��ü������ ��
//	-> Spring Framework���� ������Ʈ(��-@Controller) ������̼��� �ִ� Ŭ�������� �˻���
//  -> Spring Framework���� �̱������� ��ü�� ������
// �̱��ϸ���¹��� �⺻ �����ڸ� private�� ����� getInstance�θ�����?

@SpringBootApplication
public class HelloApplication {

	public static void main(String[] args) {

		SpringApplication.run(HelloApplication.class, args);
	}

}
