package exercise;

import java.util.Scanner;

public class Exercise09 {

	public static void main(String[] args) {
		boolean run = true;
		int studentNum = 0;
		int[] scores = null;
		Scanner scanner = new Scanner(System.in); // System.in(standard input stream, Ű���� �Է�)

		while (run) {
			System.out.println("---------------------------");
			System.out.println("1.�л��� | 2.�����Է� | 3.��������Ʈ | 4.�м� | 5.����");
			System.out.println("---------------------------");
			System.out.println("����> ");

			// ���� �Է°��� �Է� ����
			int selectNo = scanner.nextInt();

			switch (selectNo) {
			case 1:
				// �Է��� �л��� ��ŭ �迭 ũ�⸦ �ʱ�ȭ
				System.out.println("�л���>");
				studentNum = scanner.nextInt();
				scores = new int[studentNum];
				break;
			case 2:
				// �迭ũ�� ��ŭ �ݺ��ؼ� ������ �Է� ����

				for (int i = 0; i < studentNum; i++) {
					System.out.println("�����Է�>");
					scores[i] = scanner.nextInt();
				}
				break;
			case 3:
				// �迭ũ�⸸ŭ �ݺ��ؼ� ���� ����� ���
				for (int i = 0; i < studentNum; i++) {
					System.out.println("scores[" + i + "]: " + scores[i]);
				}
				break;
			case 4:
				// �ְ������� ������� ���
				int max = 0;
				int sum = 0;

				for (int i = 0; i < studentNum; i++) {
					if (scores[i] > max)
						max = scores[i];
					sum += scores[i];
				}
				System.out.println("�ְ� ����: " + max);
				System.out.println("��� ����: " + (double) sum / studentNum);
				break;
			case 5:
				// run false�� �ݺ��� Ż��
				run = false;
				break;
			}

			System.out.println("���α׷� ����");
		}

	}

}
