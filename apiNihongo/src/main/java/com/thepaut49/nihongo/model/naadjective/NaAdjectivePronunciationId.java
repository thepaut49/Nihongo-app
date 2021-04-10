package com.thepaut49.nihongo.model.naadjective;

import java.io.Serializable;

public class NaAdjectivePronunciationId implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private Integer naAdjectiveId;
	
	private Integer pronunciationNumber;

	/*** getter / setter ***/
	
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
	
	/*** constructor ***/
	public NaAdjectivePronunciationId() {
	}
	
	public NaAdjectivePronunciationId(Integer naAdjectiveId, Integer pronunciationNumber) {
		this.naAdjectiveId = naAdjectiveId;
		this.pronunciationNumber = pronunciationNumber;
	}
	
	/*** methods ***/

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((pronunciationNumber == null) ? 0 : pronunciationNumber.hashCode());
		result = prime * result + ((naAdjectiveId == null) ? 0 : naAdjectiveId.hashCode());
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
		NaAdjectivePronunciationId other = (NaAdjectivePronunciationId) obj;
		if (pronunciationNumber == null) {
			if (other.pronunciationNumber != null)
				return false;
		} else if (!pronunciationNumber.equals(other.pronunciationNumber))
			return false;
		if (naAdjectiveId == null) {
			if (other.naAdjectiveId != null)
				return false;
		} else if (!naAdjectiveId.equals(other.naAdjectiveId))
			return false;
		return true;
	}

}
