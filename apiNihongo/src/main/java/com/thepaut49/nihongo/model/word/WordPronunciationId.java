package com.thepaut49.nihongo.model.word;

import java.io.Serializable;

public class WordPronunciationId implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private Integer wordId;
	
	private Integer pronunciationNumber;

	/*** getter / setter ***/
	
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
	
	/*** constructor ***/
	public WordPronunciationId() {
	}
	
	public WordPronunciationId(Integer wordId, Integer pronunciationNumber) {
		this.wordId = wordId;
		this.pronunciationNumber = pronunciationNumber;
	}
	
	/*** methods ***/

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((pronunciationNumber == null) ? 0 : pronunciationNumber.hashCode());
		result = prime * result + ((wordId == null) ? 0 : wordId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		WordPronunciationId other = (WordPronunciationId) obj;
		if (pronunciationNumber == null) {
			if (other.pronunciationNumber != null)
				return false;
		} else if (!pronunciationNumber.equals(other.pronunciationNumber))
			return false;
		if (wordId == null) {
			if (other.wordId != null)
				return false;
		} else if (!wordId.equals(other.wordId))
			return false;
		return true;
	}

}
