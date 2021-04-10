package com.thepaut49.nihongo.model.kanji;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Version;


@Entity
@IdClass(KanjiPronunciationId.class)
public class KanjiPronunciation implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
    private Integer kanjiId;
	
	@Id
	private Integer pronunciationNumber;
	
	
	@Column(nullable = false, length = 50)
	private String pronunciation;
	
	@Version
	private int version;
	
	/*** getter / setter ***/

	public Integer getKanjiId() {
		return kanjiId;
	}

	public void setKanjiId(Integer kanjiId) {
		this.kanjiId = kanjiId;
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
		return " KanjiMeaning : { Kanji id : " + this.kanjiId + ", Pronunciation number : " + this.pronunciationNumber + " , Pronunciation : " + this.pronunciation + " , version : " + this.version + " }" ;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((pronunciation == null) ? 0 : pronunciation.hashCode());
		result = prime * result + ((pronunciationNumber == null) ? 0 : pronunciationNumber.hashCode());
		result = prime * result + ((kanjiId == null) ? 0 : kanjiId.hashCode());
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
		KanjiPronunciation other = (KanjiPronunciation) obj;
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
		if (kanjiId == null) {
			if (other.kanjiId != null)
				return false;
		} else if (!kanjiId.equals(other.kanjiId))
			return false;
		return true;
	}

	
	
}
