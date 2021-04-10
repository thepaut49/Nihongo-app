package com.thepaut49.nihongo.model.name;

import java.io.Serializable;

public class NameMeaningId implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private Integer nameId;
	
	private Integer meaningNumber;

	/*** getter / setter ***/
	
	public Integer getNameId() {
		return nameId;
	}

	public void setNameId(Integer nameId) {
		this.nameId = nameId;
	}

	public Integer getMeaningNumber() {
		return meaningNumber;
	}

	public void setMeaningNumber(Integer meaningNumber) {
		this.meaningNumber = meaningNumber;
	}
	
	/*** constructor ***/
	public NameMeaningId() {
	}
	
	public NameMeaningId(Integer nameId, Integer meaningNumber) {
		this.nameId = nameId;
		this.meaningNumber = meaningNumber;
	}
	
	/*** methods ***/

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((meaningNumber == null) ? 0 : meaningNumber.hashCode());
		result = prime * result + ((nameId == null) ? 0 : nameId.hashCode());
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
		NameMeaningId other = (NameMeaningId) obj;
		if (meaningNumber == null) {
			if (other.meaningNumber != null)
				return false;
		} else if (!meaningNumber.equals(other.meaningNumber))
			return false;
		if (nameId == null) {
			if (other.nameId != null)
				return false;
		} else if (!nameId.equals(other.nameId))
			return false;
		return true;
	}

}
