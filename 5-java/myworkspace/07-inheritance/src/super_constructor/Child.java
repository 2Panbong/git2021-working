package super_constructor;

public class Child extends Parent {
	private String name;

	// ȣ�� 1��
	public Child() {
		// super(); // �Ͻ���(�ڵ�)���� ȣ���̵�
		this("ȫ�浿"); // -> Parent("ȫ�浿") ȣ��
		// ��� -4
		System.out.println("Parent() call");
	}

	// ȣ�� - 4��
	public Child(String name) {

		this.name = name;
		// ��� 3��°

		System.out.println("Parent(String name) call");
	}
}
