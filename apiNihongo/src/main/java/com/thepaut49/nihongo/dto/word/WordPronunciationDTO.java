package com.thepaut49.nihongo.dto.word;

public class WordPronunciationDTO {
	
	private Integer wordId;
    private Integer pronunciationNumber;
    private String pronunciation;
	private int version;

	   
    /*** getter /setter ***/
    public Integer getWordId() {
		return wordId;
	}

	public void setWordId(Integer wordId) {
		this.wordId = wordId;
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
