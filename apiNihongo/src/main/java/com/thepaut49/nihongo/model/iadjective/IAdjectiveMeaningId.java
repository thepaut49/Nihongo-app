package com.thepaut49.nihongo.model.iadjective;

import java.io.Serializable;

public class IAdjectiveMeaningId implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private Integer iAdjectiveId;
	
	private Integer meaningNumber;

	/*** getter / setter ***/
	
	public Integer getIAdjectiveId() {
		return iAdjectiveId;
	}

	public void setIAdjectiveId(Integer iAdjectiveId) {
		this.iAdjectiveId = iAdjectiveId;
	}

	public Integer getMeaningNumber() {
		return meaningNumber;
	}

	public void setMeaningNumber(Integer meaningNumber) {
		this.meaningNumber = meaningNumber;
	}
	
	/*** constructor ***/
	public IAdjectiveMeaningId() {
	}
	
	public IAdjectiveMeaningId(Integer iAdjectiveId, Integer meaningNumber) {
		this.iAdjectiveId = iAdjectiveId;
		this.meaningNumber = meaningNumber;
	}
	
	/*** methods ***/

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((meaningNumber == null) ? 0 : meaningNumber.hashCode());
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
		IAdjectiveMeaningId other = (IAdjectiveMeaningId) obj;
		if (meaningNumber == null) {
			if (other.meaningNumber != null)
				return false;
		} else if (!meaningNumber.equals(other.meaningNumber))
			return false;
		if (iAdjectiveId == null) {
			if (other.iAdjectiveId != null)
				return false;
		} else if (!iAdjectiveId.equals(other.iAdjectiveId))
			return false;
		return true;
	}

}
