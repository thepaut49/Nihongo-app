package com.thepaut49.nihongo.model.kanji;

import java.io.Serializable;

public class KanjiPronunciationId implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private Integer kanjiId;
	
	private Integer pronunciationNumber;

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
	
	/*** constructor ***/
	public KanjiPronunciationId() {
	}
	
	public KanjiPronunciationId(Integer kanjiId, Integer pronunciationNumber) {
		this.kanjiId = kanjiId;
		this.pronunciationNumber = pronunciationNumber;
	}
	
	/*** methods ***/

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
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
		KanjiPronunciationId other = (KanjiPronunciationId) obj;
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
