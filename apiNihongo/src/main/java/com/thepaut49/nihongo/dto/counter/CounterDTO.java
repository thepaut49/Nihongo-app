package com.thepaut49.nihongo.dto.counter;

import java.util.Set;

public class CounterDTO {

	private Integer id;
	private String kanjis;
	private Set<CounterPronunciationDTO> pronunciations;
	private String use;
	private String summary;
	private Integer numberOfUse;
	private int version;
	
	/*** getter-setter ***/
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getKanjis() {
		return kanjis;
	}

	public void setKanjis(String kanjis) {
		this.kanjis = kanjis;
	}
	
	public Set<CounterPronunciationDTO>  getPronunciations() {
		return pronunciations;
	}

	public void setPronunciations(Set<CounterPronunciationDTO>  pronunciations) {
		this.pronunciations = pronunciations;
	}
	
	public String getUse() {
		return use;
	}

	public void setUse(String use) {
		this.use = use;
	}
	
	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public Integer getNumberOfUse() {
		return numberOfUse;
	}

	public void setNumberOfUse(Integer numberOfUse) {
		this.numberOfUse = numberOfUse;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}
}
