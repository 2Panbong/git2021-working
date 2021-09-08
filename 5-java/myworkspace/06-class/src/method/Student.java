package method;

//  클래스의 이름은 Pascal Case
// 대문자 단어로 시작
// 하나의 단위 프로그램(전체 프로그램의 일부분)
public class Student {

	String name;
	int age;
	int semester;
	String major;

	// 생성자는 반환형식이 없음
	// 클래스 이름과 동일(대문자로 시작)
	Student() {
		// 아무것도 처리안 함
		// 객체 생성만 함

	}

	// 이름, 나이, 학기, 학과 받고 필드 초기화 및 객체 생성
	Student(String name, int age, int semester, String major) {
		this.name = name;
		this.age = age;
		this.semester = semester;
		this.major = major;
	}

	// void: 반환형식이 없음
	// 반환형식 함수명() {...}
	// 무조건 메서드는 camel-case
	void printPersonInfo() {
		System.out.println(this.name + " " + this.age);
	}

	// 거의 데이터를 가져오는 메서드는 get.... 이런 형태

	String getMajorInfo() {
		return this.major + ", 학기: " + this.semester;
	}
}
