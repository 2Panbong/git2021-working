package constructor.sub;

//  Ŭ������ �̸��� Pascal Case
// �빮�� �ܾ�� ����
// �ϳ��� ���� ���α׷�(��ü ���α׷��� �Ϻκ�)
public class Student {

	// default ���� ������
	// �ܺ���Ű�������� ���ٺҰ�
	String name;

	// public ���� ������
	// ��� ��Ű���� Ŭ�������� ��� ������
	public int age;

	// protected ���� ������
	// �ܺ� ��Ű������ ���Ұ��ε� �� Ŭ������ ���(extends)�޾Ƽ� ����ϸ� ��밡��
	protected int semester; // �б�

	String major; // �а�

	// �����ε�(Overloading)
	// �޼��� �ñ״�ó(method signature)
	// : �޼��� �̸� + �Ű� ����
	// �޼��� �̸��� �����ϰ� �Ű������� ����, Ÿ�� ������
	// �ٸ� �޼��带 �����ϴ� ��

	// ��ü���� ���α׷����� ������ ������ ����
	// ������(polymorphism) = �پ��� ���¸� ������.
	// �޼��� �����ε�
	// = ��ü�� �޼��尡 �پ��� ���¸� ������ ��

	// �Ű������� ���� �⺻ �����ڴ� Ŭ������ �����
	// �ٸ� �����ڸ� �������� ���� ������ �����ؾ� ��
	// ������(Constructor)
	// ��ü ������ �ʱ�ȭ ���� ���
	// Ŭ������� ������(��ҹ��ڷ� �����ϴ� �޼���)
	public Student() {
		// �ƹ��͵� ó���� ��
		// ��ü ������ ��
		// �����ڸ� ���Ƿ� �����, �⺻�����ڴ� ���ŵ�
		// �̸��� ���̸� �Ű������� �޾Ƽ�
		// ��ü(�ν��Ͻ�)�� �����ϴ� ������ �޼���
	}

	Student(String name, int age) {

//	Student(String name, String major) {
//	Student(int age, String name) {} ������ �ٸ���������
//	Student(String _name, int _age) {
		// this.�ʵ�
		// ������� ��ü�� �ʵ忡 ����
		this.name = name;
		this.age = age;

		// ������ ������ java������ �� ������� �ʴ� ���
//		name = _name;
//		age = _age;
	}

	// �̸�, ����, �б�, �а� �ް� �ʵ� �ʱ�ȭ �� ��ü ����
	Student(String name, int age, int semester, String major) {
		this.name = name;
		this.age = age;
		this.semester = semester;
		this.major = major;
	}

	protected void joinCourse() {

	}
}
