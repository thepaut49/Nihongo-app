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
public class VerbMeaning implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", unique = true, nullable = false)
    private Integer id;
	
	@ManyToOne
	private Verb verb;
	
	@Column(nullable = false)
	private String meaning;
	
	@Column(nullable = false)
	private Integer meaningNumber;
	
	@Version
	private int version;
	
	/*** getter / setter ***/

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public Verb getVerb() {
		return verb;
	}

	public void setVerb(Verb verb) {
		this.verb = verb;
	}

	public String getMeaning() {
		return meaning;
	}

	public void setMeaning(String meaning) {
		this.meaning = meaning;
	}
	
	public Integer getMeaningNumber() {
		return meaningNumber;
	}

	public void setMeaningNumber(Integer meaningNumber) {
		this.meaningNumber = meaningNumber;
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
		int stringHashCode = this.meaningNumber + this.meaning.hashCode();
        return new HashCodeBuilder(stringHashCode%2==0?stringHashCode+1:stringHashCode, PRIME).toHashCode();
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}
		VerbMeaning otherMeaning = (VerbMeaning) obj;
		if (this.id.equals(otherMeaning.getId())) {
			return true;
		}
		else {
			return false;
		}
	}

	@Override
	public String toString() {
		return " VerbMeaning : { Id : " + this.id+" , Meaning number : " + this.meaningNumber  +" , Meaning : " + this.meaning + " , version : " + this.version + " }" ;
	}
	
}
