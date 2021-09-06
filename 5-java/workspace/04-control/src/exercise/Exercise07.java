package exercise;

import java.util.Scanner;

public class Exercise07 {

	public static void main(String[] args) {
		boolean run = true;

		// 잔고 변수
		int balance = 0;

		Scanner scanner = new Scanner(System.in);

		// run이 true인 동안 반복
		while (run) {
			System.out.println("------------------------------");
			System.out.println("1.예금 | 2.출금 | 3.잔고 | 4.종료");
			System.out.println("------------------------------");
			System.out.println("선택>");

			// 작성 위치

			// 입력값을 받음
			switch (scanner.nextByte()) {
			// 입력값에 따라서 예금, 출금 또는 잔고 출력 로직 수행
			// 예금일 때
			case 1:
				System.out.println("예금액>");
				balance += scanner.nextInt();
				// 입력 받은 값을 잔고에 추가
				break;
			// 출금일 때
			case 2:
				System.out.println("출금액>");
				balance -= scanner.nextInt();
				break;
			case 3:
				System.out.println("잔고액>" + balance);
				break;
			// 입 력값이 4(종료)일 때는 run false로 나감
			case 4:
				run = false;
				break;
			}
		}

		System.out.println("프로그램 종료");

	}

}
