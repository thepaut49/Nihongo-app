package com.thepaut49.nihongo.model.name;

import java.io.Serializable;

public class NamePronunciationId implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private Integer nameId;
	
	private Integer pronunciationNumber;

	/*** getter / setter ***/
	
	public Integer getNameId() {
		return nameId;
	}

	public void setNameId(Integer nameId) {
		this.nameId = nameId;
	}

	public Integer getPronunciationNumber() {
		return pronunciationNumber;
	}

	public void setPronunciationNumber(Integer pronunciationNumber) {
		this.pronunciationNumber = pronunciationNumber;
	}
	
	/*** constructor ***/
	public NamePronunciationId() {
	}
	
	public NamePronunciationId(Integer nameId, Integer pronunciationNumber) {
		this.nameId = nameId;
		this.pronunciationNumber = pronunciationNumber;
	}
	
	/*** methods ***/

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((pronunciationNumber == null) ? 0 : pronunciationNumber.hashCode());
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
		NamePronunciationId other = (NamePronunciationId) obj;
		if (pronunciationNumber == null) {
			if (other.pronunciationNumber != null)
				return false;
		} else if (!pronunciationNumber.equals(other.pronunciationNumber))
			return false;
		if (nameId == null) {
			if (other.nameId != null)
				return false;
		} else if (!nameId.equals(other.nameId))
			return false;
		return true;
	}

}
