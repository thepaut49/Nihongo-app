package com.thepaut49.nihongo.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Version;

import org.apache.commons.lang3.builder.HashCodeBuilder;

@Entity
public class IAdjectiveMeaning implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", unique = true, nullable = false)
    private Integer id;
 
    @Column( nullable = false)
    private Integer meaningNumber;
    
    @ManyToOne
    private IAdjective iAdjective;
    
    @Column( nullable = false)
    private String meaning;
    
    @Version
	private int version;

	   
    /*** getter /setter ***/
    public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getMeaningNumber() {
		return meaningNumber;
	}

	public void setMeaningNumber(Integer meaningNumber) {
		this.meaningNumber = meaningNumber;
	}

	public IAdjective getIAdjective() {
		return iAdjective;
	}

	public void setIAdjective(IAdjective iAdjective) {
		this.iAdjective = iAdjective;
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
	public int hashCode() {
		final int PRIME = 31;
        int hashcode = this.meaningNumber + this.meaning.hashCode();
        return new HashCodeBuilder(hashcode%2==0?hashcode+1:hashcode, PRIME).toHashCode();
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}
		IAdjectiveMeaning otherMeaning = (IAdjectiveMeaning) obj;
		if (this.meaningNumber.equals(otherMeaning.getMeaningNumber()) && this.meaning.equals(otherMeaning.getMeaning())) {
			return true;
		}
		else {
			return false;
		}
	}

	@Override
	public String toString() {
		return "{ Id : " + this.id + ", meaning number : " + this.meaningNumber + " , Meaning : " + this.meaning +
				  " , version : " + this.version + " }" ;
	}
	
}
