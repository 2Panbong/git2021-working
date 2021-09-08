package Exercise;

public class ShopService {

	// static ��ü ���� ����
	private static ShopService ss;

	// �⺻ ������ private - ��ü �������ϰ�
	private ShopService() {

	}

	// ��ü�� ��ȯ�ϴ� �޼���
	public static ShopService getInstance() {
		// null�ϋ�(�ʱ����)�϶�
		// ��ü�� �ѹ� ������
		// �� �������ʹ� ������ ��ü�� ��ȯ
		if (ss == null) {
			ss = new ShopService();
		}

		return ss;
	}

}
