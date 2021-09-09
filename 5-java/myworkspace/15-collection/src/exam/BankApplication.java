package exam;

import java.util.HashMap;
import java.util.InputMismatchException;
import java.util.Map;
import java.util.Scanner;

public class BankApplication {

	// Map 여러가지 형태의 Map 가능한 타입(Inteface)
	// = HashMap
	// = HashTable
	// = TreeMap
	//
	// 대입하는 자료구조에 따라서 같은 메서드를 호출하더라도
	// 내부적인 처리방식이 다름

	// 계좌목록 Map 객체
	// Map<키타입, 값타입> 변수명 = new HashMap<키타입, 값타입>();
	private static Map<String, Account> accounts = new HashMap<String, Account>();

	private static Scanner scanner = new Scanner(System.in);

	public static void main(String[] args) {

		boolean run = true;
		while (run) {
			System.out.println("----------------------------------------------------------");
			System.out.println("1.계좌생성 | 2.계좌목록 | 3.예금 | 4.출금 | 5.종료");
			System.out.println("----------------------------------------------------------");
			System.out.print("선택> ");

			try {

				// 예외가 일어날 수 있는 문구
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
				} // 입력받은 숫자가 해당 명령의 범위를 벗어나면 출력할 문자
				else if (selectNo > 5 || selectNo < 1) {
					System.out.println("해당하는 명령 숫자가 존재하지 않습니다.");
					System.out.println("다시 한번 확인해주세요.");
				}
				// 만약에 selectNo가 숫자값이 아니라면 예외 처리 함
			} catch (InputMismatchException exception) {
				System.out.println("재시작 후 해당하는 명령 숫자값을 입력해주세요.");
				// 숫자가 아니라면 바로 해당 프로그램 종료
				break;
			}
		}

		System.out.println("프로그램 종료");
	}

	// 계좌생성하기(계좌추가하기)
	private static void createAccount() {

		String hongAno = new String();
		String hongOwner = new String();
		int hongBalance = 0;

		System.out.println("-----------------");
		System.out.println("계좌생성");
		System.out.println("-----------------");
		System.out.println("계좌번호: ");

		hongAno = scanner.next();

		// 만약 해당 계좌가 존재한다면
		if (accounts.containsKey(hongAno)) {
			System.out.println("해당 계좌는 이미 존재합니다");
			System.out.println("다른 계좌를 입력해주세요.");
			return;
		}

		System.out.println("계좌주: ");
		hongOwner = scanner.next();

		System.out.println("초기입금액: ");
		hongBalance = scanner.nextInt();

		if (hongBalance <= 0) {
			System.out.println("0원보다 큰 값을 입력해주세요");
		} else {
			Account hong = new Account(hongAno, hongOwner, hongBalance);
			accounts.put(hongAno, hong);
			System.out.println("결과: 계좌가 생성되었습니다.");
		}

	}

	// 계좌목록보기
	private static void accountList() {
		if (accounts.isEmpty()) {
			System.out.println("현재 계좌 목록이 존재하지 않습니다.");
			return;
		}

		System.out.println("-----------------");
		System.out.println("계좌목록");
		System.out.println("-----------------");

		for (Account account : accounts.values()) {
			String nameHong = account.getOwner();
			int moneyHong = account.getBalance();
			System.out.println(account.getAno() + "\t" + nameHong + "\t" + moneyHong);
		}

	}

	// 예금하기(필드값수정)
	private static void deposit() {
		if (accounts.isEmpty()) {
			System.out.println("예금할 계좌 목록이 존재하지 않습니다.");
			return;
		}

		System.out.println("-----------------");
		System.out.println("예금");
		System.out.println("-----------------");
		System.out.println("계좌번호: ");
		String findAno = scanner.next();
		if (accounts.containsKey(findAno)) {
			System.out.println("예금액: ");
			int depo = scanner.nextInt();
			Account aHong = accounts.get(findAno);
			aHong.setBalance(aHong.getBalance() + depo);
			System.out.println("결과 : 예금이 성공되었습니다.");
		} else {
			System.out.println("일치하는 계좌가 없습니다");
		}
	}

	// 출금하기(필드값수정)
	private static void withdraw() {
		if (accounts.isEmpty()) {
			System.out.println("출금할 계좌 목록이 존재하지 않습니다.");
			return;
		}

		System.out.println("-----------------");
		System.out.println("출금");
		System.out.println("-----------------");
		System.out.println("계좌번호: ");
		String findAno = scanner.next();
		if (accounts.containsKey(findAno)) {
			System.out.println("출금액: ");
			int withd = scanner.nextInt();
			Account bHong = accounts.get(findAno);
			bHong.setBalance(bHong.getBalance() - withd);
			System.out.println("결과 : 출금이 성공되었습니다.");
		} else {
			System.out.println("일치하는 계좌가 없습니다");
		}
	}

}