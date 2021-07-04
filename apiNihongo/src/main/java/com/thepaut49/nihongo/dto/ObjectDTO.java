package com.thepaut49.nihongo.dto;

public class ObjectDTO {
	
	private Long id;
	
	private String value;

	private String kanjis;

	private String neutralForm;

	private String groupe;

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

	public String getKanjis() {
		return kanjis;
	}

	public void setKanjis(String kanjis) {
		this.kanjis = kanjis;
	}

	public String getNeutralForm() {
		return neutralForm;
	}

	public void setNeutralForm(String neutralForm) {
		this.neutralForm = neutralForm;
	}

	public String getGroupe() {
		return groupe;
	}

	public void setGroupe(String groupe) {
		this.groupe = groupe;
	}

	public ObjectDTO(Long id, String value) {
		super();
		this.id = id;
		this.value = value;
	}

	public ObjectDTO(Long id, String value, String kanjis, String neutralForm, String groupe) {
		super();
		this.id = id;
		this.value = value;
		this.kanjis = kanjis;
		this.neutralForm = neutralForm;
		this.groupe = groupe;
	}
}
