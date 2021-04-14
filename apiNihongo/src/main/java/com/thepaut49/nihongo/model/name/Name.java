package com.thepaut49.nihongo.model.name;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Version;

@Entity
public class Name implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, unique = true, length = 25)
	private String kanjis;
	
	@OneToMany(cascade=CascadeType.ALL, orphanRemoval=true, mappedBy="nameId")
	private Set<NamePronunciation> pronunciations;
	
	@OneToMany(cascade=CascadeType.ALL, orphanRemoval=true, mappedBy="nameId")
	private Set<NameMeaning> meanings = new HashSet<>();
	
	private Integer numberOfUse;
	
	@Version
	private int version;
	
	/*** getter / setter ***/

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

	public Set<NamePronunciation> getPronunciations() {
		return pronunciations;
	}

	public void setPronunciations(Set<NamePronunciation> pronunciations) {
		this.pronunciations = pronunciations;
	}

	public Set<NameMeaning> getMeanings() {
		return meanings;
	}

	public void setMeanings(Set<NameMeaning> meanings) {
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
	public String toString() {
		return " Name : { Id : " + this.id +" , Kanjis : " + this.kanjis + ", Pronunciations : [" + this.pronunciations + " ] , Meaning : [" 
	  + this.meanings + " ], Number of use : " + this.numberOfUse  + " , version : " + this.version + " }" ;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((kanjis == null) ? 0 : kanjis.hashCode());
		result = prime * result + ((numberOfUse == null) ? 0 : numberOfUse.hashCode());
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
		Name other = (Name) obj;
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
		if (numberOfUse == null) {
			if (other.numberOfUse != null)
				return false;
		} else if (!numberOfUse.equals(other.numberOfUse))
			return false;
		return true;
	}	
}
