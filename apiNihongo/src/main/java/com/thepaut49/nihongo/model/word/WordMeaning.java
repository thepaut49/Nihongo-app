package com.thepaut49.nihongo.model.word;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Version;


@Entity
@IdClass(WordMeaningId.class)
public class WordMeaning implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
    private Integer wordId;
	
	@Id
	private Integer meaningNumber;
	
	
	@Column(nullable = false)
	private String meaning;
	
	@Version
	private int version;
	
	/*** getter / setter ***/

	public Integer getWordId() {
		return wordId;
	}

	public void setWordId(Integer wordId) {
		this.wordId = wordId;
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
		return " WordMeaning : { Word id : " + this.wordId + ", meaningNumber : " + this.meaningNumber + " , Meaning : " + this.meaning + " , version : " + this.version + " }" ;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((meaning == null) ? 0 : meaning.hashCode());
		result = prime * result + ((meaningNumber == null) ? 0 : meaningNumber.hashCode());
		result = prime * result + ((wordId == null) ? 0 : wordId.hashCode());
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
		WordMeaning other = (WordMeaning) obj;
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
		if (wordId == null) {
			if (other.wordId != null)
				return false;
		} else if (!wordId.equals(other.wordId))
			return false;
		return true;
	}

	
	
}
