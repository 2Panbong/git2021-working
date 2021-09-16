package com.git.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletResponse;

import com.git.controller.contact.Contact;
import com.git.controller.contact.ContactController;

@SpringBootTest
public class TestContactController {

	@Test
	void addContact() {
		// given �ܰ� �׽�Ʈ ������ �̸� �غ��ص�
		ContactController controller = new ContactController();
		Contact expected = Contact.builder().name("�赿��").number("010-5093-0362").email("kim@naver.com").memo("test�Դϴ�")
				.build();

		// when �ܰ� event flow�� �����ϴ� �ܰ�
		// ServletResponse ��ü�� ��¥(Mock)�� �־���
		controller.addContact(expected, new MockHttpServletResponse());

		// then- �������� ������������ ����� ���ϴ� �ܰ�

		// ��ü ��Ͽ� �츮�� �߰��Ѱ��� �����ɴϴ�.
		List<Contact> contacts = controller.getContacts();
		Contact actual = contacts.get(0); // get�ȿ��� �ε����� �������°�
		// ���ǻ����� id�� index�� �ٸ������� ����

		// ������ �񱳴ܰ�
		assertEquals(1, actual.getId());
		assertEquals(expected.getMemo(), actual.getMemo());
		assertEquals(expected.getName(), actual.getName());
		assertEquals(expected.getEmail(), actual.getEmail());
		assertEquals(expected.getNumber(), actual.getNumber());
	}

	@Test
	void removeTodo() {
		// given �ܰ� �׽�Ʈ �����͸� �غ���
		ContactController controller = new ContactController();

		Contact contactItem = Contact.builder().name("�赿��").number("010-5093-0362").email("kim@naver.com")
				.memo("test�Դϴ�").build();

		controller.addContact(contactItem, new MockHttpServletResponse());

		List<Contact> beforeContacts = controller.getContacts();
		assertEquals(1, beforeContacts.size()); // ���������� ���ũ�Ⱑ 1���� ��

		// when �׽�Ʈ ���̽� event flow�� �����մϴ�
		// id�� 1�� contact �ϳ��� ������
		controller.removeContact(1, new MockHttpServletResponse());

		// then - ������� ���ϴ� �ܰ�
		List<Contact> afterContacts = controller.getContacts();
		assertEquals(0, afterContacts.size()); // ���� �Ŀ� 0���� ��
	}

	@Test
	void modifyContact() {
		ContactController controller = new ContactController();

		Contact testItem = Contact.builder().name("�赿��").number("010-5093-0362").email("kim@naver.com").memo("test�Դϴ�")
				.build();
		controller.addContact(testItem, new MockHttpServletResponse());

		// ������ �׽�Ʈ ������
		String expectedResult = "modify test memo";
		String expectedResultName = "�赿��";
		String expectedResultNumber = "010-5093-0362";
		String expectedResultEmail = "kim@naver.com";
		Contact modifyData = Contact.builder().name(expectedResultName).number(expectedResultNumber)
				.email(expectedResultEmail).memo(expectedResult).build();

		HttpServletResponse res = new MockHttpServletResponse();

		// basic flow - �������� ����
		// when - �׽�Ʈ ���̽� event flow�� ����
		// id�� 1�� contact�� memo�� ����
		controller.modifyContact(1, modifyData, res);

		// then - �������� ������� ��
		// ��� ��ȸ�� �ش� �������� �޸��� �������� ��ġ�ؾ���
		List<Contact> contacts = controller.getContacts();
		assertEquals(expectedResult, contacts.get(0).getMemo()); // ���� �Ŀ��� ��� ũ�Ⱑ 0

		// altanative flow - 1. id���� ������
		// when - id�� 2�� �����غ�
		Contact resultContactId = controller.modifyContact(2, modifyData, res);

		// then
		// ��ȯ ��ü�� null, Status Code 404
		assertNull(resultContactId);
		assertEquals(HttpServletResponse.SC_NOT_FOUND, res.getStatus());

		// altanative flow - 2.1 ������ ���� null�� ���
		// when
		Contact resultContactItem = controller.modifyContact(1, new Contact(), res);

		// then - �������� ���� ��� ��

		assertNull(resultContactItem);
		assertEquals(HttpServletResponse.SC_BAD_REQUEST, res.getStatus());

		// altanative flow - 2-2. ������ ���� �� ��("")�� ���
		// when
		Contact resultContactItemEmpty = controller.modifyContact(1,
				Contact.builder().name("").email("").memo("").build(), res);

		// then ���� ����� ���� ��� ��
		// ��ȯ ��ü�� null, Status Code 400
		assertNull(resultContactItemEmpty);
		assertEquals(HttpServletResponse.SC_BAD_REQUEST, res.getStatus());

	}
}
