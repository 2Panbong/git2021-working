package super_constructor;

public class Parent {
	public String nation;

	// 호출 2번(암시적)
	public Parent() {
		this("대한민국"); // -> Parent("대한민국") 호출
		// 출력 - 2번째
		System.out.println("Parent() call");
	}

	// 호출 3번
	public Parent(String nation) {
		this.nation = nation;
		// 출력 - 1번
		System.out.println("Parent(String nation) call");
	}
}
