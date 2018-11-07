package com.dlizarra.starter.user;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

import javax.validation.Valid;

import com.dlizarra.starter.role.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.dlizarra.starter.role.RoleName;

@RestController
public class UserController {
	LinkedList<UserDto> userList = new LinkedList<>();

	//@Autowired
	//private UserService userService = new UserServiceImpl();

	public UserController(){
		UserDto u1 = new UserDto(1,"John","correcthorsebatterystaple",true);
		UserDto u2 = new UserDto(2,"Jane","myoldhome",true);
		UserDto u3 = new UserDto(3,"Tom","mysonsbirthday",true);
		userList.add(u1);
		userList.add(u2);
		userList.add(u3);
	//	userService.createUser(u1,RoleName.ROLE_ADMIN);
	//	userService.createUser(u2, RoleName.ROLE_USER);
	//	userService.createUser(u3,RoleName.ROLE_USER);
	}


	@RequestMapping(value = "/users", method = RequestMethod.GET)
	public List<UserDto> findAll() {
		return userList;
	}

}
