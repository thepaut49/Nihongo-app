package com.thepaut49.nihongo.model.iadjective;

import java.io.Serializable;

public class IAdjectivePronunciationId implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private Integer iAdjectiveId;
	
	private Integer pronunciationNumber;

	/*** getter / setter ***/
	
	public Integer getIAdjectiveId() {
		return iAdjectiveId;
	}

	public void setIAdjectiveId(Integer iAdjectiveId) {
		this.iAdjectiveId = iAdjectiveId;
	}

	public Integer getPronunciationNumber() {
		return pronunciationNumber;
	}

	public void setPronunciationNumber(Integer pronunciationNumber) {
		this.pronunciationNumber = pronunciationNumber;
	}
	
	/*** constructor ***/
	public IAdjectivePronunciationId() {
	}
	
	public IAdjectivePronunciationId(Integer iAdjectiveId, Integer pronunciationNumber) {
		this.iAdjectiveId = iAdjectiveId;
		this.pronunciationNumber = pronunciationNumber;
	}
	
	/*** methods ***/

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((pronunciationNumber == null) ? 0 : pronunciationNumber.hashCode());
		result = prime * result + ((iAdjectiveId == null) ? 0 : iAdjectiveId.hashCode());
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
		IAdjectivePronunciationId other = (IAdjectivePronunciationId) obj;
		if (pronunciationNumber == null) {
			if (other.pronunciationNumber != null)
				return false;
		} else if (!pronunciationNumber.equals(other.pronunciationNumber))
			return false;
		if (iAdjectiveId == null) {
			if (other.iAdjectiveId != null)
				return false;
		} else if (!iAdjectiveId.equals(other.iAdjectiveId))
			return false;
		return true;
	}

}
