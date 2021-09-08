package Exercise;

import java.util.Date;

public class Printer {

//	static void println(int i) {
//		System.out.println(i);
//	}

//	static void println(boolean b ) {
//		System.out.println(b);
//	}
//	
//	static void println(double d) {
//		System.out.println(b);
//	}
//	
//	static void println(String string) {
//		System.out.println(string);
//	}

	void println(int i) {
		// TODO Auto-generated method stub
		System.out.println(i);
	}

	void println(boolean b) {
		// TODO Auto-generated method stub
		System.out.println(b);
	}

	void println(double d) {
		// TODO Auto-generated method stub
		System.out.println(d);
	}

	@SuppressWarnings("deprecation")
	void println(String string) {
		// TODO Auto-generated method stub
		System.out.println(new Date().toLocaleString() + ":" + string);
	}

	void println(String string, int index) {
		System.out.println(index + " " + string);
	}

	// postfix : 뒤쪽에 붙는 글자
	// prefix : 앞쪽에 붙는 글자
	void println(String string, int index, String postfix) {
		// TODO Auto-generated method stub
		System.out.println(index + " " + string + " " + postfix);

	}
}
