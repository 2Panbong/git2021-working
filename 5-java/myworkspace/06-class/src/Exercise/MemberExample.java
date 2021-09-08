package Exercise;

// 다른 패키지의 같은 클래스명을 가진 클래스는 import 불가임
//import constructor.sub.Student;

public class MemberExample {

	public static void main(String[] args) {
		// 이름, id를 매개변수로 받아서 객체 생성
		// 해당하는 생성자를 선언
		Member member1 = new Member("홍길동", "hong");
		Member member2 = new Member("강자바", "java");

		// 2 클래스를 사용 - constructor.sub.Student
		Student student = new Student();
		// 패키지명1.패키지2.Student
//		constructor.sub.Student student = new constructor.sub.Student();

		System.out.println(member1.name + " " + member1.id);
		System.out.println(member2.name + " " + member2.id);
	}

}
