package com.dlizarra.starter.purchase;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@EqualsAndHashCode(of = { "id" })
@ToString(of = { "id", "product" })
@Setter
@Getter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class PurchaseDto {
	public  int id;
	private String product;
	private String date;
	private float price;
	private int userId;

	public PurchaseDto() {}

	public PurchaseDto(int id, String product, String date, float price, int userId) {
		this.id = id;
		this.product = product;
		this.date = date;
		this.price = price;
		this.userId = userId;

	}
	public void setId(int i) {
		this.id = i;
	}

}
