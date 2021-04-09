package com.thepaut49.nihongo.model;

import java.io.Serializable;

public class VerbMeaningId implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private Integer verbId;
	
	private Integer meaningNumber;

	/*** getter / setter ***/
	
	public Integer getVerbId() {
		return verbId;
	}

	public void setVerbId(Integer verbId) {
		this.verbId = verbId;
	}

	public Integer getMeaningNumber() {
		return meaningNumber;
	}

	public void setMeaningNumber(Integer meaningNumber) {
		this.meaningNumber = meaningNumber;
	}
	
	/*** constructor ***/
	public VerbMeaningId() {
	}
	
	public VerbMeaningId(Integer verbId, Integer meaningNumber) {
		this.verbId = verbId;
		this.meaningNumber = meaningNumber;
	}
	
	/*** methods ***/

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((meaningNumber == null) ? 0 : meaningNumber.hashCode());
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
		VerbMeaningId other = (VerbMeaningId) obj;
		if (meaningNumber == null) {
			if (other.meaningNumber != null)
				return false;
		} else if (!meaningNumber.equals(other.meaningNumber))
			return false;
		if (verbId == null) {
			if (other.verbId != null)
				return false;
		} else if (!verbId.equals(other.verbId))
			return false;
		return true;
	}

}
