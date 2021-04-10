package com.thepaut49.nihongo.model.iadjective;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Version;


@Entity
@IdClass(IAdjectivePronunciationId.class)
public class IAdjectivePronunciation implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
    private Integer iAdjectiveId;
	
	@Id
	private Integer pronunciationNumber;
	
	
	@Column(nullable = false, length = 50)
	private String pronunciation;
	
	@Version
	private int version;
	
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

	public String getPronunciation() {
		return pronunciation;
	}

	public void setPronunciation(String pronunciation) {
		this.pronunciation = pronunciation;
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
		return " IAdjectiveMeaning : { IAdjective id : " + this.iAdjectiveId + ", Pronunciation number : " + this.pronunciationNumber + " , Pronunciation : " + this.pronunciation + " , version : " + this.version + " }" ;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((pronunciation == null) ? 0 : pronunciation.hashCode());
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
		IAdjectivePronunciation other = (IAdjectivePronunciation) obj;
		if (pronunciation == null) {
			if (other.pronunciation != null)
				return false;
		} else if (!pronunciation.equals(other.pronunciation))
			return false;
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
