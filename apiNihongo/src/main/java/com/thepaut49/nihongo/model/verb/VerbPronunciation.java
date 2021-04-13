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
@IdClass(VerbPronunciationId.class)
public class VerbPronunciation implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="verb_id")
    private Integer verbId;
	
	@Id
	private Integer pronunciationNumber;
	
	
	@Column( length = 50)
	private String pronunciation;
	
	@Version
	private int version;
	
	/*** getter / setter ***/

	public Integer getVerbId() {
		return verbId;
	}

	public void setVerbId(Integer verbId) {
		this.verbId = verbId;
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
		return " VerbMeaning : { Verb ID : " + this.verbId + ", Pronunciation number : " + this.pronunciationNumber + " , Pronunciation : " + this.pronunciation + " , version : " + this.version + " }" ;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((pronunciation == null) ? 0 : pronunciation.hashCode());
		result = prime * result + ((pronunciationNumber == null) ? 0 : pronunciationNumber.hashCode());
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
		VerbPronunciation other = (VerbPronunciation) obj;
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
		if (verbId == null) {
			if (other.verbId != null)
				return false;
		} else if (!verbId.equals(other.verbId))
			return false;
		return true;
	}

	
	
}
