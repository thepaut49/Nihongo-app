package com.thepaut49.nihongo.model.verb;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Version;


@Entity
@IdClass(VerbMeaningId.class)
public class VerbMeaning implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="verb_id")
    private Integer verbId;
	
	@Id
	private Integer meaningNumber;
	
	
	@Column(nullable = false)
	private String meaning;
	
	@Version
	private int version;
	
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
		return " VerbMeaning : { Verb Id : " + this.verbId + ", meaningNumber : " + this.meaningNumber + " , Meaning : " + this.meaning + " , version : " + this.version + " }" ;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((meaning == null) ? 0 : meaning.hashCode());
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
		VerbMeaning other = (VerbMeaning) obj;
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
		if (verbId == null) {
			if (other.verbId != null)
				return false;
		} else if (!verbId.equals(other.verbId))
			return false;
		return true;
	}

	
	
}
