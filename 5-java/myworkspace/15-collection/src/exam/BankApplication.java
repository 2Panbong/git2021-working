package exam;

import java.util.HashMap;
import java.util.InputMismatchException;
import java.util.Map;
import java.util.Scanner;

public class BankApplication {

	// Map �������� ������ Map ������ Ÿ��(Inteface)
	// = HashMap
	// = HashTable
	// = TreeMap
	//
	// �����ϴ� �ڷᱸ���� ���� ���� �޼��带 ȣ���ϴ���
	// �������� ó������� �ٸ�

	// ���¸�� Map ��ü
	// Map<ŰŸ��, ��Ÿ��> ������ = new HashMap<ŰŸ��, ��Ÿ��>();
	private static Map<String, Account> accounts = new HashMap<String, Account>();

	private static Scanner scanner = new Scanner(System.in);

	public static void main(String[] args) {

		boolean run = true;
		while (run) {
			System.out.println("----------------------------------------------------------");
			System.out.println("1.���»��� | 2.���¸�� | 3.���� | 4.��� | 5.����");
			System.out.println("----------------------------------------------------------");
			System.out.print("����> ");

			try {

				// ���ܰ� �Ͼ �� �ִ� ����
				int selectNo = scanner.nextInt();

				if (selectNo == 1) {
					createAccount();
				} else if (selectNo == 2) {
					accountList();
				} else if (selectNo == 3) {
					deposit();
				} else if (selectNo == 4) {
					withdraw();
				} else if (selectNo == 5) {
					run = false;
				} // �Է¹��� ���ڰ� �ش� ����� ������ ����� ����� ����
				else if (selectNo > 5 || selectNo < 1) {
					System.out.println("�ش��ϴ� ��� ���ڰ� �������� �ʽ��ϴ�.");
					System.out.println("�ٽ� �ѹ� Ȯ�����ּ���.");
				}
				// ���࿡ selectNo�� ���ڰ��� �ƴ϶�� ���� ó�� ��
			} catch (InputMismatchException exception) {
				System.out.println("����� �� �ش��ϴ� ��� ���ڰ��� �Է����ּ���.");
				// ���ڰ� �ƴ϶�� �ٷ� �ش� ���α׷� ����
				break;
			}
		}

		System.out.println("���α׷� ����");
	}

	// ���»����ϱ�(�����߰��ϱ�)
	private static void createAccount() {

		String hongAno = new String();
		String hongOwner = new String();
		int hongBalance = 0;

		System.out.println("-----------------");
		System.out.println("���»���");
		System.out.println("-----------------");
		System.out.println("���¹�ȣ: ");

		hongAno = scanner.next();

		// ���� �ش� ���°� �����Ѵٸ�
		if (accounts.containsKey(hongAno)) {
			System.out.println("�ش� ���´� �̹� �����մϴ�");
			System.out.println("�ٸ� ���¸� �Է����ּ���.");
			return;
		}

		System.out.println("������: ");
		hongOwner = scanner.next();

		System.out.println("�ʱ��Աݾ�: ");
		hongBalance = scanner.nextInt();

		if (hongBalance <= 0) {
			System.out.println("0������ ū ���� �Է����ּ���");
		} else {
			Account hong = new Account(hongAno, hongOwner, hongBalance);
			accounts.put(hongAno, hong);
			System.out.println("���: ���°� �����Ǿ����ϴ�.");
		}

	}

	// ���¸�Ϻ���
	private static void accountList() {
		if (accounts.isEmpty()) {
			System.out.println("���� ���� ����� �������� �ʽ��ϴ�.");
			return;
		}

		System.out.println("-----------------");
		System.out.println("���¸��");
		System.out.println("-----------------");

		for (Account account : accounts.values()) {
			String nameHong = account.getOwner();
			int moneyHong = account.getBalance();
			System.out.println(account.getAno() + "\t" + nameHong + "\t" + moneyHong);
		}

	}

	// �����ϱ�(�ʵ尪����)
	private static void deposit() {
		if (accounts.isEmpty()) {
			System.out.println("������ ���� ����� �������� �ʽ��ϴ�.");
			return;
		}

		System.out.println("-----------------");
		System.out.println("����");
		System.out.println("-----------------");
		System.out.println("���¹�ȣ: ");
		String findAno = scanner.next();
		if (accounts.containsKey(findAno)) {
			System.out.println("���ݾ�: ");
			int depo = scanner.nextInt();
			Account aHong = accounts.get(findAno);
			aHong.setBalance(aHong.getBalance() + depo);
			System.out.println("��� : ������ �����Ǿ����ϴ�.");
		} else {
			System.out.println("��ġ�ϴ� ���°� �����ϴ�");
		}
	}

	// ����ϱ�(�ʵ尪����)
	private static void withdraw() {
		if (accounts.isEmpty()) {
			System.out.println("����� ���� ����� �������� �ʽ��ϴ�.");
			return;
		}

		System.out.println("-----------------");
		System.out.println("���");
		System.out.println("-----------------");
		System.out.println("���¹�ȣ: ");
		String findAno = scanner.next();
		if (accounts.containsKey(findAno)) {
			System.out.println("��ݾ�: ");
			int withd = scanner.nextInt();
			Account bHong = accounts.get(findAno);
			bHong.setBalance(bHong.getBalance() - withd);
			System.out.println("��� : ����� �����Ǿ����ϴ�.");
		} else {
			System.out.println("��ġ�ϴ� ���°� �����ϴ�");
		}
	}

}