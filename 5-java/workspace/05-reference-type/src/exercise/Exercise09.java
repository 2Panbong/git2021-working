package exercise;

import java.util.Scanner;

public class Exercise09 {

	public static void main(String[] args) {
		boolean run = true;
		int studentNum = 0;
		int[] scores = null;
		Scanner scanner = new Scanner(System.in); // System.in(standard input stream, 키보드 입력)

		while (run) {
			System.out.println("---------------------------");
			System.out.println("1.학생수 | 2.점수입력 | 3.점수리스트 | 4.분석 | 5.종료");
			System.out.println("---------------------------");
			System.out.println("선택> ");

			// 숫자 입력값을 입력 받음
			int selectNo = scanner.nextInt();

			switch (selectNo) {
			case 1:
				// 입력한 학생수 만큼 배열 크기를 초기화
				break;
			case 2:
				// 배열크기 만큼 반복해서 점수를 입력 받음
				break;
			case 3:
				// 배열크기만큼 반복해서 점수 목록을 출력
				break;
			case 4:
				// 최고점수와 평균점수 출력
				break;
			case 5:
				// run false로 반복문 탈출
				run = false;
				break;
			}
		}

	}

}
