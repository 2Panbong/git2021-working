package Exercise;

// �ٸ� ��Ű���� ���� Ŭ�������� ���� Ŭ������ import �Ұ���
//import constructor.sub.Student;

public class MemberExample {

	public static void main(String[] args) {
		// �̸�, id�� �Ű������� �޾Ƽ� ��ü ����
		// �ش��ϴ� �����ڸ� ����
		Member member1 = new Member("ȫ�浿", "hong");
		Member member2 = new Member("���ڹ�", "java");

		// 2 Ŭ������ ��� - constructor.sub.Student
		Student student = new Student();
		// ��Ű����1.��Ű��2.Student
//		constructor.sub.Student student = new constructor.sub.Student();

		System.out.println(member1.name + " " + member1.id);
		System.out.println(member2.name + " " + member2.id);
	}

}
