package com.thepaut49.nihongo.dto;

public class ObjectDTO {
	
	private Long id;
	
	private String value;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public ObjectDTO(Long id, String value) {
		super();
		this.id = id;
		this.value = value;
	}
}
