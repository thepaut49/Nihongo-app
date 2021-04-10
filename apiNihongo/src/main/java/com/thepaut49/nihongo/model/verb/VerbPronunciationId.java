package com.thepaut49.nihongo.model.verb;

import java.io.Serializable;

public class VerbPronunciationId implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private Integer verbId;
	
	private Integer pronunciationNumber;

	/*** getter / setter ***/
	
	public Integer getVerbId() {
		return verbId;
	}

	public void setVerbId(Integer verbId) {
		this.verbId = verbId;
	}

	public Integer getPronunciationNumber() {
		return pronunciationNumber;
	}

	public void setPronunciationNumber(Integer pronunciationNumber) {
		this.pronunciationNumber = pronunciationNumber;
	}
	
	/*** constructor ***/
	public VerbPronunciationId() {
	}
	
	public VerbPronunciationId(Integer verbId, Integer pronunciationNumber) {
		this.verbId = verbId;
		this.pronunciationNumber = pronunciationNumber;
	}
	
	/*** methods ***/

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((pronunciationNumber == null) ? 0 : pronunciationNumber.hashCode());
		result = prime * result + ((verbId == null) ? 0 : verbId.hashCode());
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
		VerbPronunciationId other = (VerbPronunciationId) obj;
		if (pronunciationNumber == null) {
			if (other.pronunciationNumber != null)
				return false;
		} else if (!pronunciationNumber.equals(other.pronunciationNumber))
			return false;
		if (verbId == null) {
			if (other.verbId != null)
				return false;
		} else if (!verbId.equals(other.verbId))
			return false;
		return true;
	}

}
