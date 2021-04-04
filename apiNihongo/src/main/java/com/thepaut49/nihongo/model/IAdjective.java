package com.thepaut49.nihongo.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Version;

import org.apache.commons.lang3.builder.HashCodeBuilder;

@Entity
public class IAdjective implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(nullable = false, unique = true, length = 25)
	private String kanjis;
	
	@Column(nullable = false)
	private String pronunciation;
	
	@OneToMany(cascade=CascadeType.ALL)
    @JoinColumn(name="IADJECTIVE_ID")
	private Set<IAdjectiveMeaning> meanings = new HashSet<>();
	
	private Integer numberOfUse;
	
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

	public Set<IAdjectiveMeaning> getMeanings() {
		return meanings;
	}

	public void setMeanings(Set<IAdjectiveMeaning> meanings) {
		this.meanings = meanings;
	}

	public Integer getNumberOfUse() {
		return numberOfUse;
	}

	public void setNumberOfUse(Integer numberOfUse) {
		this.numberOfUse = numberOfUse;
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
		IAdjective otherAdj = (IAdjective) obj;
		if (this.kanjis.equals(otherAdj.getKanjis())) {
			return true;
		}
		else {
			return false;
		}
	}

	@Override
	public String toString() {
		return " I-adjective : { Id : " + this.id +" , Kanjis : " + this.kanjis + ", Pronunciation : " + this.pronunciation + " , Meanings : [" 
	  + this.meanings + " ], Number of use : " + this.numberOfUse  + " , version : " + this.version + " }" ;
	}
	
	
	

}
