package exercise;

public class Exercise04 {

	public static void main(String[] args) {
		int num1 = 0;
		int num2 = 0;

		while (num1 + num2 != 5) {
			num1 = (int) (Math.random() * 6) + 1;
			num2 = (int) (Math.random() * 6) + 1;
			System.out.println(num1 + "," + num2);

		}

	}

}
