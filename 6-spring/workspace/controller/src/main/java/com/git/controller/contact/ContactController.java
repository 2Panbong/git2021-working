package com.git.controller.contact;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.SortedMap;
import java.util.TreeMap;
import java.util.concurrent.atomic.AtomicLong;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

// REST API

@RestController
public class ContactController {

	private SortedMap<Long, Contact> contacts = Collections
			.synchronizedSortedMap(new TreeMap<Long, Contact>(Collections.reverseOrder()));

	// id 값 생성에 사용할 변수
	public AtomicLong maxId = new AtomicLong();

	// contact 목록조회
	// GET/ contacts
	@GetMapping(value = "/contacts")
	public List<Contact> getContacts() {
		// 맵 데이터 역정렬
		// 맵 값 목록
		return new ArrayList<Contact>(contacts.values());
	}

	// contact 1건추가
	// POST / contacts
	// HttpServletRequests req도 넣어서 할수있음
	@PostMapping(value = "/contacts")
	public Contact addContact(@RequestBody Contact contact, HttpServletResponse res) {
		// 데이터 검증 로직
		// 메모값이 없으면 에러처리
		if (contact.getMemo() == null || contact.getMemo().isEmpty()) {
			// 클라이언트에서 메모값이 없이 보내거나 빈값으로 보낸것임
			// 클라이언트 오류, 4xx
			// 요청값을 잘못보낸 것임 - Bad Request(400)
			// res.setStatus(400)

			// Dispatcher Servlet이 생성한 응답객체에 status코드를 넣어줌
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		} else if (contact.getEmail() == null || contact.getEmail().isEmpty()) {
			// 클라이언트에서 이메일이 없이 보내거나 빈값으로 보낼때 400에러출력
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		} else if (contact.getName() == null || contact.getName().isEmpty()) {
			// 클라이언트에서 이름이 없이 보내거나 빈값으로 보낼때 400에러출력
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		} else if (contact.getNumber() == null || contact.getNumber().isEmpty()) {
			// 클라이언트에서 번호 없이 보내거나 빈값으로 보낼때 400에러출력
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// id값을 생성한뒤 숫자값 1증가하고 가져오기
		Long currentId = maxId.incrementAndGet();
		// 입력받은 데이터로 contact객체를 생성
		// id값과 생성일시는 서버에서 생성한 것으로 처리함
		// html 태그가 있으면 날려버림(script에서 문제가 발생함

		Contact contactItem = Contact.builder().id(currentId)
//					.memo(contact.getMemo()).createdTime(new Date().getTime()).build();
				.memo(contact.getMemo()).name(contact.getName()).number(contact.getNumber()).email(contact.getEmail())
				.createdTime(new Date().getTime()).build();
		// contact 목록객체에 추가
		contacts.put(currentId, contactItem);

		// 리소스 생성됨
		// res.setStatus(201);
		res.setStatus(HttpServletResponse.SC_CREATED);

		// 추가된 객체를 반환
		return contactItem;
	}

	public boolean removeContact(long id, HttpServletResponse res) {

		// 해당 id의 데이터 1건 가져오기
		Contact contact = contacts.get(Long.valueOf(id));
		// 해당 id의 데이터가 없으면
		if (contact == null) {
			// 404에러 : 해당 경로에 리소스가 없음
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}

		// 삭제 하기
		contacts.remove(Long.valueOf(id));

		return true;
	}

	@PutMapping(value = "/contacts/{id}")
	public Contact modifyContact(@PathVariable long id, @RequestBody Contact contact, HttpServletResponse res) {
		Contact findItem = contacts.get(Long.valueOf(id));
		// 해당하는 id에 데이터가 없다면
		if (findItem == null) {
			// res.setStatus(404);
			// NOT FOUND : 해당 경로에 리소스가 없음
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return null;
		}

		// 데이터 검증 로직
		// 메모값이 없으면 에러처리
		if (contact.getMemo() == null || contact.getMemo().isEmpty()) {
			// 클라이언트 오류, 4xx
			// 요청값을 잘못보낸 것임 - Bad Request(400)
			// res.setStatus(400) //SC_BAD_REQUEST자체가 400번 코드임

			// Dispatcher Servlet이 생성한 응답객체에 status코드를 넣어줌
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		} else if (contact.getName() == null || contact.getName().isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		} else if (contact.getEmail() == null || contact.getEmail().isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		} else if (contact.getNumber() == null || contact.getNumber().isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// 데이터 변경
		findItem.setMemo(contact.getMemo());
		findItem.setName(contact.getName());
		findItem.setEmail(contact.getEmail());
		findItem.setNumber(contact.getNumber());

		return new Contact();
	}

}
