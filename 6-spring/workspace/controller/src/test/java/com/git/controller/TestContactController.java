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
		// given 단계 테스트 데이터 미리 준비해둠
		ContactController controller = new ContactController();
		Contact expected = Contact.builder().name("김동길").number("010-5093-0362").email("kim@naver.com").memo("test입니다")
				.build();

		// when 단계 event flow를 수행하는 단계
		// ServletResponse 객체는 가짜(Mock)을 넣어줌
		controller.addContact(expected, new MockHttpServletResponse());

		// then- 예상결과랑 실제데이터의 결과를 비교하는 단계

		// 전체 목록에 우리가 추가한것을 가져옵니다.
		List<Contact> contacts = controller.getContacts();
		Contact actual = contacts.get(0); // get안에는 인덱스로 가져오는것
		// 주의사항은 id와 index는 다른것임을 주의

		// 데이터 비교단계
		assertEquals(1, actual.getId());
		assertEquals(expected.getMemo(), actual.getMemo());
		assertEquals(expected.getName(), actual.getName());
		assertEquals(expected.getEmail(), actual.getEmail());
		assertEquals(expected.getNumber(), actual.getNumber());
	}

	@Test
	void removeTodo() {
		// given 단계 테스트 데이터를 준비함
		ContactController controller = new ContactController();

		Contact contactItem = Contact.builder().name("김동길").number("010-5093-0362").email("kim@naver.com")
				.memo("test입니다").build();

		controller.addContact(contactItem, new MockHttpServletResponse());

		List<Contact> beforeContacts = controller.getContacts();
		assertEquals(1, beforeContacts.size()); // 삭제전에는 목록크기가 1인지 비교

		// when 테스트 케이스 event flow를 수행합니다
		// id가 1인 contact 하나를 삭제함
		controller.removeContact(1, new MockHttpServletResponse());

		// then - 결과들을 비교하는 단계
		List<Contact> afterContacts = controller.getContacts();
		assertEquals(0, afterContacts.size()); // 삭제 후에 0인지 비교
	}

	@Test
	void modifyContact() {
		ContactController controller = new ContactController();

		Contact testItem = Contact.builder().name("김동길").number("010-5093-0362").email("kim@naver.com").memo("test입니다")
				.build();
		controller.addContact(testItem, new MockHttpServletResponse());

		// 변경할 테스트 데이터
		String expectedResult = "modify test memo";
		String expectedResultName = "김동길";
		String expectedResultNumber = "010-5093-0362";
		String expectedResultEmail = "kim@naver.com";
		Contact modifyData = Contact.builder().name(expectedResultName).number(expectedResultNumber)
				.email(expectedResultEmail).memo(expectedResult).build();

		HttpServletResponse res = new MockHttpServletResponse();

		// basic flow - 정상적인 실행
		// when - 테스트 케이스 event flow를 수행
		// id가 1인 contact에 memo를 수정
		controller.modifyContact(1, modifyData, res);

		// then - 예상결과와 실제결과 비교
		// 목록 조회시 해당 아이템의 메모값이 예상결과과 일치해야함
		List<Contact> contacts = controller.getContacts();
		assertEquals(expectedResult, contacts.get(0).getMemo()); // 삭제 후에는 목록 크기가 0

		// altanative flow - 1. id값이 없을때
		// when - id를 2로 수정해봄
		Contact resultContactId = controller.modifyContact(2, modifyData, res);

		// then
		// 변환 객체가 null, Status Code 404
		assertNull(resultContactId);
		assertEquals(HttpServletResponse.SC_NOT_FOUND, res.getStatus());

		// altanative flow - 2.1 세가지 값이 null인 경우
		// when
		Contact resultContactItem = controller.modifyContact(1, new Contact(), res);

		// then - 예상결과와 실제 결과 비교

		assertNull(resultContactItem);
		assertEquals(HttpServletResponse.SC_BAD_REQUEST, res.getStatus());

		// altanative flow - 2-2. 세가지 값이 빈 값("")인 경우
		// when
		Contact resultContactItemEmpty = controller.modifyContact(1,
				Contact.builder().name("").email("").memo("").build(), res);

		// then 예상 결과와 실제 결과 비교
		// 변환 객체가 null, Status Code 400
		assertNull(resultContactItemEmpty);
		assertEquals(HttpServletResponse.SC_BAD_REQUEST, res.getStatus());

	}
}
