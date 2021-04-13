package com.thepaut49.nihongo.model.suffix;

import java.io.Serializable;

public class SuffixPronunciationId implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private Integer suffixId;
	
	private Integer pronunciationNumber;

	/*** getter / setter ***/
	
	public Integer getSuffixId() {
		return suffixId;
	}

	public void setSuffixId(Integer suffixId) {
		this.suffixId = suffixId;
	}

	public Integer getPronunciationNumber() {
		return pronunciationNumber;
	}

	public void setPronunciationNumber(Integer pronunciationNumber) {
		this.pronunciationNumber = pronunciationNumber;
	}
	
	/*** constructor ***/
	public SuffixPronunciationId() {
	}
	
	public SuffixPronunciationId(Integer suffixId, Integer pronunciationNumber) {
		this.suffixId = suffixId;
		this.pronunciationNumber = pronunciationNumber;
	}
	
	/*** methods ***/

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((pronunciationNumber == null) ? 0 : pronunciationNumber.hashCode());
		result = prime * result + ((suffixId == null) ? 0 : suffixId.hashCode());
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
		SuffixPronunciationId other = (SuffixPronunciationId) obj;
		if (pronunciationNumber == null) {
			if (other.pronunciationNumber != null)
				return false;
		} else if (!pronunciationNumber.equals(other.pronunciationNumber))
			return false;
		if (suffixId == null) {
			if (other.suffixId != null)
				return false;
		} else if (!suffixId.equals(other.suffixId))
			return false;
		return true;
	}

}
