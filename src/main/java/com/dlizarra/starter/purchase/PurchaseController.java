package com.dlizarra.starter.purchase;

import com.dlizarra.starter.user.UserDto;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@RestController
public class PurchaseController {
	private static int i = 3;
	LinkedList<PurchaseDto> purchaseList = new LinkedList<>();

	//@Autowired
	//private UserService userService = new UserServiceImpl();

	public PurchaseController(){
		//format for <input type="date">
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

		PurchaseDto u1 = new PurchaseDto(1,"Seife", "2018-09-21",5,1);
		PurchaseDto u2 = new PurchaseDto(2,"Kaffee","2018-10-31",8,2);
		PurchaseDto u3 = new PurchaseDto(3,"Tee","2018-10-05",4,2);
		purchaseList.add(u1);
		purchaseList.add(u2);
		purchaseList.add(u3);
	}

	@RequestMapping(value = "/purchases", method = RequestMethod.GET)
	public List<PurchaseDto> findAll() {
		return purchaseList;
	}

	@PostMapping(value="/purchases" )
	public List<PurchaseDto> Insert(@RequestBody PurchaseDto user) {
		System.out.println("post included");
		user.setId(++i);
		purchaseList.add(user);
		return purchaseList;
	}

	@DeleteMapping( value="/purchases/{id}" )
	public List<PurchaseDto> Delete(@PathVariable int id) {
		for (PurchaseDto user : purchaseList) {
			if (user.id == id) {
				purchaseList.remove(user);
				break;
			}
		}
		return purchaseList;
	}

	@PutMapping( value="/purchases/{id}" )
	public List<PurchaseDto> Update(@PathVariable int id, @RequestBody PurchaseDto user) {
		for (PurchaseDto remove : purchaseList) {
			if (remove.id == id) {
				purchaseList.set(purchaseList.indexOf(remove), user);
				break;
			}
		}
		return purchaseList;
	}
	/*public List<PurchaseDto> Insert(@RequestParam("product") String product, @RequestParam("date") Date date,@RequestParam("price") float price,@RequestParam("userId") int userId) {
		System.out.println("post included");
		PurchaseDto u1 = new PurchaseDto(++i,product,date,price,userId);
		purchaseList.add(u1);
		return purchaseList;
	}*/

}
