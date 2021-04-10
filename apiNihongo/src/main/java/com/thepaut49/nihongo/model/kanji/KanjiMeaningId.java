package com.thepaut49.nihongo.model.kanji;

import java.io.Serializable;

public class KanjiMeaningId implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private Integer kanjiId;
	
	private Integer meaningNumber;

	/*** getter / setter ***/
	
	public Integer getKanjiId() {
		return kanjiId;
	}

	public void setKanjiId(Integer kanjiId) {
		this.kanjiId = kanjiId;
	}

	public Integer getMeaningNumber() {
		return meaningNumber;
	}

	public void setMeaningNumber(Integer meaningNumber) {
		this.meaningNumber = meaningNumber;
	}
	
	/*** constructor ***/
	public KanjiMeaningId() {
	}
	
	public KanjiMeaningId(Integer kanjiId, Integer meaningNumber) {
		this.kanjiId = kanjiId;
		this.meaningNumber = meaningNumber;
	}
	
	/*** methods ***/

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((meaningNumber == null) ? 0 : meaningNumber.hashCode());
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
		KanjiMeaningId other = (KanjiMeaningId) obj;
		if (meaningNumber == null) {
			if (other.meaningNumber != null)
				return false;
		} else if (!meaningNumber.equals(other.meaningNumber))
			return false;
		if (kanjiId == null) {
			if (other.kanjiId != null)
				return false;
		} else if (!kanjiId.equals(other.kanjiId))
			return false;
		return true;
	}

}
