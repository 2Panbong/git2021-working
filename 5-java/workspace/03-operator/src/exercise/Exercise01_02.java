package exercise;

public class Exercise01_02 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		// 1번 답 : 연산식은 하나 이상의 값을 산출할 수 없다.
		int x = 10;
		int y = 20;
		int z = (++x) + (y--);
		System.out.println(z);
	} // 31이 뜸

}
