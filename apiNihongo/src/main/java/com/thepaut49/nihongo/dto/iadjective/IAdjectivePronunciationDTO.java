package com.thepaut49.nihongo.dto.iadjective;

public class IAdjectivePronunciationDTO {

	private Integer iiAdjectiveId;
    private Integer pronunciationNumber;
    private String pronunciation;
	private int version;

	   
    /*** getter /setter ***/
    public Integer getIiAdjectiveId() {
		return iiAdjectiveId;
	}

	public void setIiAdjectiveId(Integer iAdjectiveId) {
		this.iiAdjectiveId = iAdjectiveId;
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
