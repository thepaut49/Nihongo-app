package com.thepaut49.nihongo.model.word;

import java.io.Serializable;

public class WordMeaningId implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private Integer wordId;
	
	private Integer meaningNumber;

	/*** getter / setter ***/
	
	public Integer getWordId() {
		return wordId;
	}

	public void setWordId(Integer wordId) {
		this.wordId = wordId;
	}

	public Integer getMeaningNumber() {
		return meaningNumber;
	}

	public void setMeaningNumber(Integer meaningNumber) {
		this.meaningNumber = meaningNumber;
	}
	
	/*** constructor ***/
	public WordMeaningId() {
	}
	
	public WordMeaningId(Integer wordId, Integer meaningNumber) {
		this.wordId = wordId;
		this.meaningNumber = meaningNumber;
	}
	
	/*** methods ***/

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((meaningNumber == null) ? 0 : meaningNumber.hashCode());
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
		WordMeaningId other = (WordMeaningId) obj;
		if (meaningNumber == null) {
			if (other.meaningNumber != null)
				return false;
		} else if (!meaningNumber.equals(other.meaningNumber))
			return false;
		if (wordId == null) {
			if (other.wordId != null)
				return false;
		} else if (!wordId.equals(other.wordId))
			return false;
		return true;
	}

}
