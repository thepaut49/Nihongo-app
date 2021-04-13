package com.thepaut49.nihongo.dto.suffix;

import java.util.Set;

public class SuffixDTO {

	private Integer id;
	private String kanjis;
	private Set<SuffixPronunciationDTO> pronunciations;
	private String use;
	private String summary;
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
	
	public Set<SuffixPronunciationDTO>  getPronunciations() {
		return pronunciations;
	}

	public void setPronunciations(Set<SuffixPronunciationDTO>  pronunciations) {
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

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}
}
