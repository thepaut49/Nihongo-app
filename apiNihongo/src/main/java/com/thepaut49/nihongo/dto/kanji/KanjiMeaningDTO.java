package com.thepaut49.nihongo.dto.kanji;

public class KanjiMeaningDTO {
	
    private Integer kanjiId;
    private Integer meaningNumber;
    private String meaning;
	private int version;

	   
    /*** getter /setter ***/
    public Integer getKanjiId() {
		return kanjiId;
	}

	public void setKanjiId(Integer kanjiId) {
		this.kanjiId = kanjiId;
	}

	public Integer getMeaningNumber() {
		return meaningNumber;
	}

	public void setMeaningNumber(Integer meaningNumber) {
		this.meaningNumber = meaningNumber;
	}

	public String getMeaning() {
		return meaning;
	}

	public void setMeaning(String meaning) {
		this.meaning = meaning;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}
		
}
