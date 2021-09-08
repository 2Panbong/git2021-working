package method;

//  Ŭ������ �̸��� Pascal Case
// �빮�� �ܾ�� ����
// �ϳ��� ���� ���α׷�(��ü ���α׷��� �Ϻκ�)
public class Student {

	String name;
	int age;
	int semester;
	String major;

	// �����ڴ� ��ȯ������ ����
	// Ŭ���� �̸��� ����(�빮�ڷ� ����)
	Student() {
		// �ƹ��͵� ó���� ��
		// ��ü ������ ��

	}

	// �̸�, ����, �б�, �а� �ް� �ʵ� �ʱ�ȭ �� ��ü ����
	Student(String name, int age, int semester, String major) {
		this.name = name;
		this.age = age;
		this.semester = semester;
		this.major = major;
	}

	// void: ��ȯ������ ����
	// ��ȯ���� �Լ���() {...}
	// ������ �޼���� camel-case
	void printPersonInfo() {
		System.out.println(this.name + " " + this.age);
	}

	// ���� �����͸� �������� �޼���� get.... �̷� ����

	String getMajorInfo() {
		return this.major + ", �б�: " + this.semester;
	}
}
