package com.thepaut49.nihongo.model.iadjective;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Version;


@Entity
public class IAdjectiveMeaning implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", unique = true, nullable = false)
    private Long id;
	
	@ManyToOne
    private IAdjective iAdjective;
	
	@Column(nullable = false)
	private Integer meaningNumber;
	
	@Column(nullable = false)
	private String meaning;
	
	@Version
	private int version;
	
	/*** getter / setter ***/
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public IAdjective getIAdjective() {
		return iAdjective;
	}

	public void setIAdjective(IAdjective iAdjective) {
		this.iAdjective = iAdjective;
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
		return " IAdjectiveMeaning : { Id : "+ this.id + " , IAdjective id : " + this.iAdjective + ", meaningNumber : " + this.meaningNumber + " , Meaning : " + this.meaning + " , version : " + this.version + " }" ;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((iAdjective == null) ? 0 : iAdjective.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((meaning == null) ? 0 : meaning.hashCode());
		result = prime * result + ((meaningNumber == null) ? 0 : meaningNumber.hashCode());
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
		if (iAdjective == null) {
			if (other.iAdjective != null)
				return false;
		} else if (!iAdjective.equals(other.iAdjective))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
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
		return true;
	}
}
