package exercise;

public class Exercise067 {

	public static void main(String[] args) {
		// 6번 답 : 3,5
		int max = 0;
		int[] array = { 1, 5, 3, 8, 2 };

		// 작성 위치
		for (int i = 0; i <= array.length - 1; i++) {
			if (max < array[i]) {
				max = array[i];
			}
		}

		System.out.println("max: " + max);

	}

}
