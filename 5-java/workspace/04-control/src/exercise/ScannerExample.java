package exercise;

import java.util.Scanner;

public class ScannerExample {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		// Scanner ���� ���콺 Ŀ���� �ø��� ctrl + 1 -> quick fix
		// java.tuil.Scanner
		Scanner scanner = new Scanner(System.in);
		System.out.println("--�Է°��� �Է��ϼ���.--"); // ������ ������ ���
		System.out.println(">"); 
		
		String input = "";
		input = scanner.next(); // ���ڿ� ���� �Է� ���� �� ����
		System.out.println(input);
		int num = 0;
		int amount = 0;
		
		System.out.println("--���ڸ� �Է��ϼ���.--");
		System.out.println(">");
		num = scanner.nextInt();
		
		System.out.println(num);	
		// 7���� �ض�!
	}

}
