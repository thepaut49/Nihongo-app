package com.thepaut49.nihongo.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Version;

import org.apache.commons.lang3.builder.HashCodeBuilder;

@Entity
public class Sentence implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(nullable = false, unique = true)
	private String kanjis;
	
	@Column(nullable = false)
	private String pronunciation;
	
	@Column(nullable = false, length = 500)
	private String meaning;
	
	@Column(nullable = false, length = 50)
	private String topic;
	
	@Version
	private int version;
	
	/*** getter / setter ***/

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getKanjis() {
		return kanjis;
	}

	public void setKanjis(String kanjis) {
		this.kanjis = kanjis;
	}

	public String getPronunciation() {
		return pronunciation;
	}

	public void setPronunciation(String pronunciation) {
		this.pronunciation = pronunciation;
	}

	public String getMeaning() {
		return meaning;
	}

	public void setMeaning(String meaning) {
		this.meaning = meaning;
	}
	
	public String getTopic() {
		return topic;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}
	
	/*** methods ***/
	@Override
	public int hashCode() {
		final int PRIME = 31;
		int stringHashCode = this.kanjis.hashCode();
        return new HashCodeBuilder(stringHashCode%2==0?stringHashCode+1:stringHashCode, PRIME).toHashCode();
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}
		NaAdjective otherVerb = (NaAdjective) obj;
		if (this.kanjis.equals(otherVerb.getKanjis())) {
			return true;
		}
		else {
			return false;
		}
	}

	@Override
	public String toString() {
		return " Word : { Id : " + this.id +" , Kanjis : " + this.kanjis + ", Pronunciation : " + this.pronunciation + " , Meaning : " 
	  + this.meaning  + " , Topic : " 
			  + this.topic  + " , version : " + this.version + " }" ;
	}
	
}