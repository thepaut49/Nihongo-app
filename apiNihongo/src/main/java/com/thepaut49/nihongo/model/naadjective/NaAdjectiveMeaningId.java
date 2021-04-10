package com.thepaut49.nihongo.model.naadjective;

import java.io.Serializable;

public class NaAdjectiveMeaningId implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private Integer naAdjectiveId;
	
	private Integer meaningNumber;

	/*** getter / setter ***/
	
	public Integer getNaAdjectiveId() {
		return naAdjectiveId;
	}

	public void setNaAdjectiveId(Integer naAdjectiveId) {
		this.naAdjectiveId = naAdjectiveId;
	}

	public Integer getMeaningNumber() {
		return meaningNumber;
	}

	public void setMeaningNumber(Integer meaningNumber) {
		this.meaningNumber = meaningNumber;
	}
	
	/*** constructor ***/
	public NaAdjectiveMeaningId() {
	}
	
	public NaAdjectiveMeaningId(Integer naAdjectiveId, Integer meaningNumber) {
		this.naAdjectiveId = naAdjectiveId;
		this.meaningNumber = meaningNumber;
	}
	
	/*** methods ***/

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((meaningNumber == null) ? 0 : meaningNumber.hashCode());
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
		NaAdjectiveMeaningId other = (NaAdjectiveMeaningId) obj;
		if (meaningNumber == null) {
			if (other.meaningNumber != null)
				return false;
		} else if (!meaningNumber.equals(other.meaningNumber))
			return false;
		if (naAdjectiveId == null) {
			if (other.naAdjectiveId != null)
				return false;
		} else if (!naAdjectiveId.equals(other.naAdjectiveId))
			return false;
		return true;
	}

}
