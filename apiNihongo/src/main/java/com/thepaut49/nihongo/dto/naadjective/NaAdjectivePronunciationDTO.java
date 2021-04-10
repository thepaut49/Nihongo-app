package com.thepaut49.nihongo.dto.naadjective;

public class NaAdjectivePronunciationDTO {
	
	private Integer naAdjectiveId;
    private Integer pronunciationNumber;
    private String pronunciation;
	private int version;

	   
    /*** getter /setter ***/
    public Integer getNaAdjectiveId() {
		return naAdjectiveId;
	}

	public void setNaAdjectiveId(Integer naAdjectiveId) {
		this.naAdjectiveId = naAdjectiveId;
	}

	public Integer getPronunciationNumber() {
		return pronunciationNumber;
	}

	public void setPronunciationNumber(Integer pronunciationNumber) {
		this.pronunciationNumber = pronunciationNumber;
	}

	public String getPronunciation() {
		return pronunciation;
	}

	public void setPronunciation(String pronunciation) {
		this.pronunciation = pronunciation;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}
	
}
