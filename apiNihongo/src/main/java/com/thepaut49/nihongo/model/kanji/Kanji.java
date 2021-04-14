package com.thepaut49.nihongo.model.kanji;

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


@Entity
public class Kanji implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, unique = true)
	private Character kanji;
	
	@OneToMany(cascade=CascadeType.ALL, orphanRemoval=true)
	@JoinColumn(name="kanji_id")
	private Set<KanjiPronunciation> pronunciations;
	
	@OneToMany(cascade=CascadeType.ALL, orphanRemoval=true)
	@JoinColumn(name="kanji_id")
	private Set<KanjiMeaning> meanings = new HashSet<>();
	
	@Column(nullable = false)
	private Integer strokeNumber;
	
	@Column(length = 50)
	private String radicals;
	
	private Integer numberOfUse;
	
	@Version
	private int version;
	
	/*** getter /setter ***/

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Character getKanji() {
		return kanji;
	}

	public void setKanji(Character kanji) {
		this.kanji = kanji;
	}

	public Set<KanjiPronunciation> getPronunciations() {
		return pronunciations;
	}

	public void setPronunciations(Set<KanjiPronunciation> pronunciations) {
		this.pronunciations = pronunciations;
	}

	public Set<KanjiMeaning> getMeanings() {
		return meanings;
	}

	public void setMeanings(Set<KanjiMeaning> meanings) {
		this.meanings = meanings;
	}

	public Integer getStrokeNumber() {
		return strokeNumber;
	}

	public void setStrokeNumber(Integer strokeNumber) {
		this.strokeNumber = strokeNumber;
	}

	public String getRadicals() {
		return radicals;
	}

	public void setRadicals(String radicals) {
		this.radicals = radicals;
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
		return "{ Id : " + this.id +" , Kanji : " + this.kanji + ", Pronunciation : [ " + this.pronunciations +
				"] , Strokes number : " + this.strokeNumber + ", Radicals : " + this.radicals + ", Number of use : " + this.numberOfUse + " , version : " + this.version + " }" ;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((kanji == null) ? 0 : kanji.hashCode());
		result = prime * result + ((meanings == null) ? 0 : meanings.hashCode());
		result = prime * result + ((numberOfUse == null) ? 0 : numberOfUse.hashCode());
		result = prime * result + ((pronunciations == null) ? 0 : pronunciations.hashCode());
		result = prime * result + ((radicals == null) ? 0 : radicals.hashCode());
		result = prime * result + ((strokeNumber == null) ? 0 : strokeNumber.hashCode());
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
		Kanji other = (Kanji) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (kanji == null) {
			if (other.kanji != null)
				return false;
		} else if (!kanji.equals(other.kanji))
			return false;
		if (meanings == null) {
			if (other.meanings != null)
				return false;
		} else if (!meanings.equals(other.meanings))
			return false;
		if (numberOfUse == null) {
			if (other.numberOfUse != null)
				return false;
		} else if (!numberOfUse.equals(other.numberOfUse))
			return false;
		if (pronunciations == null) {
			if (other.pronunciations != null)
				return false;
		} else if (!pronunciations.equals(other.pronunciations))
			return false;
		if (radicals == null) {
			if (other.radicals != null)
				return false;
		} else if (!radicals.equals(other.radicals))
			return false;
		if (strokeNumber == null) {
			if (other.strokeNumber != null)
				return false;
		} else if (!strokeNumber.equals(other.strokeNumber))
			return false;
		return true;
	}
}
