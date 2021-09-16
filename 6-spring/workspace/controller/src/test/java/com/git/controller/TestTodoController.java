package com.git.controller;

// ���� �������� ���ϴ� static �޼���
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletResponse;

import com.git.controller.todo.Todo;
import com.git.controller.todo.TodoController;

// ���� �׽�Ʈ(Unit Test)
// �ۼ��� Ŭ������ �޼������ �����ϴ� ��

@SpringBootTest
public class TestTodoController {

	// ���������� IoC �����̳�(�̱��� ��ü������)
	// IoC : Inversion of Control, ������ ����(������ �и�)
	// ��ü�� ����Ϸ��� ��ü�� �����ؾ���
	// ��ü ������ Spring���� ���ְ� ����� ������ �������� ���Թ޾Ƽ� �����
	// ����������(Dependency Injection) : ��ü�� ����ϴ� �� �ܺο��� ��ü�� �Ѱܹ޴� ��
	// �ַ� �ʵ�, �޼���, �Ű������� ������ �޴´�.

	// IoC �����̳ʿ� �ִ� TodoController �̱��� ��ü�� �ش� �ʵ忡 ������
	// IoC �����̳ʿ��� �����Ǵ� �̱��� ��ü�� Bean��ü��� ��
//	@Autowired
//	TodoController controller;

	// ���� �׽�Ʈ Ŭ������ �޼������ ����Ǳ� �� ���ʷ� �ѹ� ����Ǵ� �޼���
//	@BeforeAll
//	void setMockData() {
//		// ������ �����͸� 1�� �߰�
//		Todo expected = Todo.builder().memo("test").build();
//		controller.addTodo(expected, null);
//	}

	// test case : �� �� �߰�
	// event flow(ó���帧) :�� �� 1���� �߰���
	// pre-condition(��������) : ���� ����....
	// expected result(������) : �� �� ��Ͽ� �߰��� �����Ͱ� �����ؾ���

	@Test
	void addTodo() {
		// given - �׽�Ʈ ������ �� ��ü �غ�
		TodoController controller = new TodoController();
		Todo expected = Todo.builder().memo("test").build();

		// when - ���� �׽�Ʈ ���̽� event flow�� ����
		// ServletResponse ��ü�� ��¥(Mock)�� �־���
		controller.addTodo(expected, new MockHttpServletResponse());

		// then - �������� ��������� ��

		// ��ü ��Ͽ� �߰��Ѿָ� ������
		List<Todo> todos = controller.getTodos();
		Todo actual = todos.get(0); // arrayList.get(�ε���)

		// ������ �����Ϳ� ���� �����͸� ����
		assertEquals(1, actual.getId());
		assertEquals(expected.getMemo(), actual.getMemo());
	}

	// test case : �� �� ����
	// event flow(ó���帧) :�� �� 1���� ������
	// pre-condition(��������) : �� �� �����Ͱ� �ּ� 1�� �̻� �־����
	// expected result(������) : �� �� ��Ͽ� ������ �����Ͱ� �����ϸ� �ȵ�

	@Test
	void removeTodo() {
		// given - �׽�Ʈ ������ �� ��ü �غ�
		// ���������� �ִٸ� ���������� �غ��ϴ� �ܰ�
		// ���⼭�� 1�� �߰��� �Ǿ��־����
		TodoController controller = new TodoController();

		Todo testItem = Todo.builder().memo("test").build();

		controller.addTodo(testItem, new MockHttpServletResponse());

		List<Todo> beforeTodos = controller.getTodos();
		assertEquals(1, beforeTodos.size()); // ���������� ��� ũ�Ⱑ 1

		// when - �׽�Ʈ ���̽� event flow�� ����
		// id�� 1�� todo 1���� ����
		controller.removeTodo(1, new MockHttpServletResponse());

		// then - �������� ��������� ��
		// ����� ��ȸ���� �� ����� ũ�Ⱑ 0 �̾����
		List<Todo> afterTodos = controller.getTodos();
		assertEquals(0, afterTodos.size()); // ���� �Ŀ��� ��� ũ�Ⱑ 0
	}

	// test case : �� �� ����
	// event flow(ó���帧) :
	// basic flow(�����帧)
	// 1. �� �� 1�ǿ� ���ؼ� �޸��� ������

	// alternative flow(�����帧) :
	// 1. ��Ͽ� ���� id������ ������ ���� - 404
	// 2. �޸��� �� �� �Ǵ� ������ ��ü�� �Ⱥ����� - 400
	// pre-condition(��������) : �� �� �����Ͱ� �ּ� 1�� �̻� �־����
	// expected result(������) : �� �� ��Ͽ� ������ �޸����� ��µǾ�� ��
	@Test
	void modifyTodo() {
		// given - �׽�Ʈ ������ �� ��ü �غ�
		// ���������� �ִٸ� ���������� �غ��ϴ� �ܰ�
		// ���⼭�� 1�� �߰��� �Ǿ��־����
		TodoController controller = new TodoController();

		Todo testItem = Todo.builder().memo("test").build();
		controller.addTodo(testItem, new MockHttpServletResponse());

		// ������ �׽�Ʈ ������
		String expectedResult = "modify test memo";
		Todo modifyData = Todo.builder().memo(expectedResult).build();

		HttpServletResponse res = new MockHttpServletResponse();

		// basic flow - �������� ����
		// when - �׽�Ʈ ���̽� event flow�� ����
		// id�� 1�� todo�� memo�� ����
		controller.modifyTodo(1, modifyData, res);

		// then - �������� ��������� ��
		// ����� ��ȸ���� �� �ش� �������� �޸��� �������� ��ġ�ؾ���
		List<Todo> todos = controller.getTodos();
		assertEquals(expectedResult, todos.get(0).getMemo()); // ���� �Ŀ��� ��� ũ�Ⱑ 0

		// altanative flow - 1. id���� ���� ���
		// when - id�� 2�� �����غ�
		Todo resultTodoId = controller.modifyTodo(2, modifyData, res);

		// then
		// ��ȯ ��ü�� null, Status Code 404
		assertNull(resultTodoId);
		assertEquals(HttpServletResponse.SC_NOT_FOUND, res.getStatus());

		// altanative flow - 2-1. memo���� null�ΰ��
		// when
		Todo resultTodoMemoNull = controller.modifyTodo(1, new Todo(), res);

		// then - �������� ��������� ��
		// ��ȯ ��ü�� null, Status Code 400
		assertNull(resultTodoMemoNull);
		assertEquals(HttpServletResponse.SC_BAD_REQUEST, res.getStatus());

		// altanative flow - 2-2. memo���� �� ��("")�� ���
		// when
		Todo resultTodoMemoEmpty = controller.modifyTodo(1, Todo.builder().memo("").build(), res);

		// then - �������� ��������� ��
		// ��ȯ ��ü�� null, Status Code 400
		assertNull(resultTodoMemoEmpty);
		assertEquals(HttpServletResponse.SC_BAD_REQUEST, res.getStatus());
	}
}
