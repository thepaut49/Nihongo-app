package com.thepaut49.nihongo.model.naadjective;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Version;


@Entity
public class NaAdjectivePronunciation implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", unique = true, nullable = false)
    private Long id;
	
	@ManyToOne
    private NaAdjective naAdjective;
	
	@Column(nullable = false)
	private Integer pronunciationNumber;
	
	
	@Column(nullable = false, length = 50)
	private String pronunciation;
	
	@Version
	private int version;
	
	/*** getter / setter ***/
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}	

	public NaAdjective getNaAdjective() {
		return naAdjective;
	}

	public void setNaAdjective(NaAdjective naAdjective) {
		this.naAdjective = naAdjective;
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
		return " NaAdjectiveMeaning : {Id : " + this.id + " NaAdjective : " + this.naAdjective + ", Pronunciation number : " + this.pronunciationNumber + " , Pronunciation : " + this.pronunciation + " , version : " + this.version + " }" ;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((pronunciation == null) ? 0 : pronunciation.hashCode());
		result = prime * result + ((pronunciationNumber == null) ? 0 : pronunciationNumber.hashCode());
		result = prime * result + ((naAdjective == null) ? 0 : naAdjective.hashCode());
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
		NaAdjectivePronunciation other = (NaAdjectivePronunciation) obj;
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
		if (naAdjective == null) {
			if (other.naAdjective != null)
				return false;
		} else if (!naAdjective.equals(other.naAdjective))
			return false;
		return true;
	}

	
	
}
