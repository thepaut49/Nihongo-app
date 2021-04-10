package com.thepaut49.nihongo.model.iadjective;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Version;


@Entity
@IdClass(IAdjectiveMeaningId.class)
public class IAdjectiveMeaning implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
    private Integer iAdjectiveId;
	
	@Id
	private Integer meaningNumber;
	
	
	@Column(nullable = false)
	private String meaning;
	
	@Version
	private int version;
	
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

	public String getMeaning() {
		return meaning;
	}

	public void setMeaning(String meaning) {
		this.meaning = meaning;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}
		
	/*** override methods ***/
	@Override
	public String toString() {
		return " IAdjectiveMeaning : { IAdjective id : " + this.iAdjectiveId + ", meaningNumber : " + this.meaningNumber + " , Meaning : " + this.meaning + " , version : " + this.version + " }" ;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((meaning == null) ? 0 : meaning.hashCode());
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
		IAdjectiveMeaning other = (IAdjectiveMeaning) obj;
		if (meaning == null) {
			if (other.meaning != null)
				return false;
		} else if (!meaning.equals(other.meaning))
			return false;
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
