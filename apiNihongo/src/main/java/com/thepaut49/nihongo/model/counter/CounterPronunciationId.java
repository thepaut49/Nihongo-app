package com.thepaut49.nihongo.model.counter;

import java.io.Serializable;

public class CounterPronunciationId implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private Integer counterId;
	
	private Integer pronunciationNumber;

	/*** getter / setter ***/
	
	public Integer getCounterId() {
		return counterId;
	}

	public void setCounterId(Integer counterId) {
		this.counterId = counterId;
	}

	public Integer getPronunciationNumber() {
		return pronunciationNumber;
	}

	public void setPronunciationNumber(Integer pronunciationNumber) {
		this.pronunciationNumber = pronunciationNumber;
	}
	
	/*** constructor ***/
	public CounterPronunciationId() {
	}
	
	public CounterPronunciationId(Integer counterId, Integer pronunciationNumber) {
		this.counterId = counterId;
		this.pronunciationNumber = pronunciationNumber;
	}
	
	/*** methods ***/

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((pronunciationNumber == null) ? 0 : pronunciationNumber.hashCode());
		result = prime * result + ((counterId == null) ? 0 : counterId.hashCode());
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
		CounterPronunciationId other = (CounterPronunciationId) obj;
		if (pronunciationNumber == null) {
			if (other.pronunciationNumber != null)
				return false;
		} else if (!pronunciationNumber.equals(other.pronunciationNumber))
			return false;
		if (counterId == null) {
			if (other.counterId != null)
				return false;
		} else if (!counterId.equals(other.counterId))
			return false;
		return true;
	}

}
