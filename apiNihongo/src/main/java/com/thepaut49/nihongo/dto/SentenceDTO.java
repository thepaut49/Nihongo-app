package com.thepaut49.nihongo.dto;

import java.util.Set;

public class SentenceDTO {

	private Integer id;
	
	private String kanjis;
	
	private Set<String> pronunciation;
	
	private Set<String> meaning;
	
	private String topic;
	
	private int version;
	
	/*** getter / setter ***/

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getKanjis() {
		return kanjis;
	}

	public void setKanjis(String neutralForm) {
		this.kanjis = neutralForm;
	}

	public Set<String> getPronunciation() {
		return pronunciation;
	}

	public void setPronunciation(Set<String> pronunciation) {
		this.pronunciation = pronunciation;
	}

	public Set<String> getMeaning() {
		return meaning;
	}

	public void setMeaning(Set<String> meaning) {
		this.meaning = meaning;
	}

	public String getTopic() {
		return topic;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}
}
