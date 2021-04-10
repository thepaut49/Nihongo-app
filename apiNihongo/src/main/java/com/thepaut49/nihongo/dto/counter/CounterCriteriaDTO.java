package com.thepaut49.nihongo.dto.counter;

public class CounterCriteriaDTO {

	private String kanjis;
	private String pronunciation;
	private String use;
	
	/*** getter-setter ***/
	
	public String getKanjis() {
		return kanjis;
	}

	public void setKanjis(String kanjis) {
		this.kanjis = kanjis;
	}
	
	public String getPronunciation() {
		return pronunciation;
	}

	public void setPronunciation(String pronunciation) {
		this.pronunciation = pronunciation;
	}
	
	public String getUse() {
		return use;
	}

	public void setUse(String use) {
		this.use = use;
	}
}
