package com.thepaut49.nihongo.dto.verb;

import java.util.Set;

public class VerbDTO {

	private Integer id;
	
	private String neutralForm;
	
	private Set<VerbPronunciationDTO> pronunciations;
	
	private Set<VerbMeaningDTO> meanings;
	
	private String groupe;
	
	private Integer numberOfUse;
	
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

	public Set<VerbPronunciationDTO> getPronunciations() {
		return pronunciations;
	}

	public void setPronunciations(Set<VerbPronunciationDTO> pronunciations) {
		this.pronunciations = pronunciations;
	}

	public Set<VerbMeaningDTO> getMeanings() {
		return meanings;
	}

	public void setMeanings(Set<VerbMeaningDTO> meanings) {
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
}
