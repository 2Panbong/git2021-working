package com.git.myworkspace.contact;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.SortedMap;
import java.util.TreeMap;
import java.util.concurrent.atomic.AtomicLong;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.DeleteMapping;
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

	// id �� ������ ����� ����
	public AtomicLong maxId = new AtomicLong();

	// contact �����ȸ
	// GET/ contacts
	@GetMapping(value = "/contacts")
	public List<Contact> getContacts() {
		// �� ������ ������
		// �� �� ���
		return new ArrayList<Contact>(contacts.values());
	}

	// contact 1���߰�
	// POST / contacts
	// HttpServletRequests req�� �־ �Ҽ�����
	@PostMapping(value = "/contacts")
	public Contact addContact(@RequestBody Contact contact, HttpServletResponse res) {
		// ������ ���� ����
		// �޸��� ������ ����ó��
//		if (contact.getMemo() == null || contact.getMemo().isEmpty()) {
////			// Ŭ���̾�Ʈ���� �޸��� ���� �����ų� ������ ��������
////			// Ŭ���̾�Ʈ ����, 4xx
////			// ��û���� �߸����� ���� - Bad Request(400)
////			// res.setStatus(400)
////
////			// Dispatcher Servlet�� ������ ���䰴ü�� status�ڵ带 �־���
//			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
//			return null;
//		} else 
		if (contact.getEmail() == null || contact.getEmail().isEmpty()) {
			// Ŭ���̾�Ʈ���� �̸����� ���� �����ų� ������ ������ 400�������
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		} else if (contact.getName() == null || contact.getName().isEmpty()) {
			// Ŭ���̾�Ʈ���� �̸��� ���� �����ų� ������ ������ 400�������
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		} else if (contact.getNumber() == null || contact.getNumber().isEmpty()) {
			// Ŭ���̾�Ʈ���� ��ȣ ���� �����ų� ������ ������ 400�������
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// ���ӿ��� �Է������� �±װ� ������ �±׸� �� ����� �� ���ڿ�
		String memo = getPlainText(contact.getMemo());
		if (memo.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		// ���ӿ��� �Է������� �±װ� ������ �±׸� �� ����� �� ���ڿ�
		String name = getPlainText(contact.getName());
		if (name.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// ��ȣ���� �Է������� �±װ� ������ �±׸� �� ����� �� ���ڿ�
		String number = getPlainText(contact.getNumber());
		if (number.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// �̸��Ͽ��� �Է������� �±װ� ������ �±׸� �� ����� �� ���ڿ�
		String email = getPlainText(contact.getEmail());
		if (email.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// id���� �����ѵ� ���ڰ� 1�����ϰ� ��������
		Long currentId = maxId.incrementAndGet();
		// �Է¹��� �����ͷ� contact��ü�� ����
		// id���� �����Ͻô� �������� ������ ������ ó����
		// html �±װ� ������ ��������(script���� ������ �߻���

		Contact contactItem = Contact.builder().id(currentId)
//					.memo(contact.getMemo()).createdTime(new Date().getTime()).build();
//				.memo(contact.getMemo()).name(contact.getName()).number(contact.getNumber()).email(contact.getEmail()).build();
//				.memo(memo).name(name).number(number).email(email).createdTime(new Date().getTime()).build();
				.name(name).number(number).email(email).memo(memo).createdTime(new Date().getTime()).build();
//				.name(name).number(number).email(email).createdTime(new Date().getTime()).build();
		// contact ��ϰ�ü�� �߰�
		contacts.put(currentId, contactItem);

		// ���ҽ� ������
		// res.setStatus(201);
		res.setStatus(HttpServletResponse.SC_CREATED);

		// �߰��� ��ü�� ��ȯ
		return contactItem;
	}

	@DeleteMapping(value = "/contacts/{id}")
	public boolean removeContact(@PathVariable long id, HttpServletResponse res) {

		// �ش� id�� ������ 1�� ��������
		Contact contact = contacts.get(Long.valueOf(id));
		// �ش� id�� �����Ͱ� ������
		if (contact == null) {
			// 404���� : �ش� ��ο� ���ҽ��� ����
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}

		// ���� �ϱ�
		contacts.remove(Long.valueOf(id));

		return true;
	}

	@PutMapping(value = "/contacts/{id}")
	public Contact modifyContact(@PathVariable long id, @RequestBody Contact contact, HttpServletResponse res) {
		Contact findItem = contacts.get(Long.valueOf(id));
		// �ش��ϴ� id�� �����Ͱ� ���ٸ�
		if (findItem == null) {
			// res.setStatus(404);
			// NOT FOUND : �ش� ��ο� ���ҽ��� ����
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return null;
		}

//		// ������ ���� ����
//		// �޸��� ������ ����ó��
//		if (contact.getMemo() == null || contact.getMemo().isEmpty()) {
////			// Ŭ���̾�Ʈ ����, 4xx
////			// ��û���� �߸����� ���� - Bad Request(400)
////			// res.setStatus(400) //SC_BAD_REQUEST��ü�� 400�� �ڵ���
////
////			// Dispatcher Servlet�� ������ ���䰴ü�� status�ڵ带 �־���
//			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
//			return null;
//		} else 
		if (contact.getName() == null || contact.getName().isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
//			else if (contact.getEmail() == null || contact.getEmail().isEmpty()) {
//			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
//			return null;
//		} 
		else if (contact.getNumber() == null || contact.getNumber().isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

//		// ���ӿ��� �Է������� �±װ� ������ �±׸� �� ����� �� ���ڿ�
		String memo = getPlainText(contact.getMemo());
		if (memo.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		// ���ӿ��� �Է������� �±װ� ������ �±׸� �� ����� �� ���ڿ�
		String name = getPlainText(contact.getName());
		if (name.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		String number = getPlainText(contact.getNumber());
		if (number.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		String email = getPlainText(contact.getEmail());
		if (email.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// ������ ����
		findItem.setMemo(memo);
		findItem.setName(name);
		findItem.setEmail(email);
		findItem.setNumber(number);

//		new Contact();
		return findItem;
	}

	// html �±׸� �����ϴ� �޼���
	private String getPlainText(String text) {
		return text.replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", "");
	}

}