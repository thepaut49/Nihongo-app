package com.thepaut49.nihongo.model.verb;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Version;

@Entity
public class Verb implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(nullable = false, unique = true, length = 25)
	private String neutralForm;
	
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval=true)
	@JoinColumn(name="verb_id")
	private Set<VerbPronunciation>  pronunciations;
	
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval=true)
	@JoinColumn(name="verb_id")
	private Set<VerbMeaning> meanings = new HashSet<>();
	
	@Column(nullable = false, length = 25)
	private String groupe;
	
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

	public String getNeutralForm() {
		return neutralForm;
	}

	public void setNeutralForm(String neutralForm) {
		this.neutralForm = neutralForm;
	}

	public Set<VerbPronunciation> getPronunciations() {
		return pronunciations;
	}

	public void setPronunciations(Set<VerbPronunciation> pronunciations) {
		this.pronunciations = pronunciations;
	}

	public Set<VerbMeaning> getMeanings() {
		return meanings;
	}

	public void setMeanings(Set<VerbMeaning> meanings) {
		this.meanings = meanings;
	}

	public String getGroupe() {
		return groupe;
	}

	public void setGroupe(String groupe) {
		this.groupe = groupe;
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
		
	/*** override methods ***/
	@Override
	public String toString() {
		return " Verb : { Id : " + this.id +" , Neutral form : " + this.neutralForm + ", Pronunciations : [ " + this.pronunciations + " ] , Meanings : [ " + this.meanings +
				" ] , Group : " + this.groupe  + " , Number of use : " + this.numberOfUse  + " , version : " + this.version + " }" ;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((groupe == null) ? 0 : groupe.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((neutralForm == null) ? 0 : neutralForm.hashCode());
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
		Verb other = (Verb) obj;
		if (groupe == null) {
			if (other.groupe != null)
				return false;
		} else if (!groupe.equals(other.groupe))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (neutralForm == null) {
			if (other.neutralForm != null)
				return false;
		} else if (!neutralForm.equals(other.neutralForm))
			return false;
		if (numberOfUse == null) {
			if (other.numberOfUse != null)
				return false;
		} else if (!numberOfUse.equals(other.numberOfUse))
			return false;
		return true;
	}
	
}
