package com.thepaut49.nihongo.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Version;


@Entity
public class Particule implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, length = 5)
	private String kanjis;
	
	@Column(nullable = false)
	private String summary;

	@Column
	private String particuleFunction;
	
	@Column
	private String howToUse;
	
	@Lob
	@Column(nullable = false)
	private String examples;
	
	@Version
	private int version;
	
	/*** getter-setter ***/
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public String getKanjis() {
		return kanjis;
	}

	public void setKanjis(String kanjis) {
		this.kanjis = kanjis;
	}
	
	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public String getParticuleFunction() {
		return particuleFunction;
	}

	public void setParticuleFunction(String function) {
		this.particuleFunction = function;
	}

	public String getHowToUse() {
		return howToUse;
	}

	public void setHowToUse(String howToUse) {
		this.howToUse = howToUse;
	}
	
	public String getExamples() {
		return examples;
	}

	public void setExamples(String examples) {
		this.examples = examples;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}
	
	/*** methods ***/

	@Override
	public String toString() {
		return " Particule : { Id : " + this.id + " , Kanjis : " + this.kanjis + " , Summary : " + this.summary +
				" , Function : " + this.particuleFunction + " , How to use : " + this.howToUse  + " , Version : " + this.version + " }" ;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((examples == null) ? 0 : examples.hashCode());
		result = prime * result + ((howToUse == null) ? 0 : howToUse.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((kanjis == null) ? 0 : kanjis.hashCode());
		result = prime * result + ((particuleFunction == null) ? 0 : particuleFunction.hashCode());
		result = prime * result + ((summary == null) ? 0 : summary.hashCode());
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
		Particule other = (Particule) obj;
		if (examples == null) {
			if (other.examples != null)
				return false;
		} else if (!examples.equals(other.examples))
			return false;
		if (howToUse == null) {
			if (other.howToUse != null)
				return false;
		} else if (!howToUse.equals(other.howToUse))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (kanjis == null) {
			if (other.kanjis != null)
				return false;
		} else if (!kanjis.equals(other.kanjis))
			return false;
		if (particuleFunction == null) {
			if (other.particuleFunction != null)
				return false;
		} else if (!particuleFunction.equals(other.particuleFunction))
			return false;
		if (summary == null) {
			if (other.summary != null)
				return false;
		} else if (!summary.equals(other.summary))
			return false;
		return true;
	}
}
