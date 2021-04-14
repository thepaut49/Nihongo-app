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
public class GrammarRule implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, length = 50)
	private String title;
	
	@Lob
	@Column(nullable = false)
	private String htmlDescription;
	
	@Column(nullable = false)
	private String firstKeyWord;
	
	@Column
	private String secondKeyWord;
	
	@Column
	private String thirdKeyWord;
	
	@Column
	private String fourthKeyWord;
	
	@Version
	private int version;
	
	/*** getter-setter ***/
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getHtmlDescription() {
		return htmlDescription;
	}

	public void setHtmlDescription(String htmlDescription) {
		this.htmlDescription = htmlDescription;
	}
	
	public String getFirstKeyWord() {
		return firstKeyWord;
	}

	public void setFirstKeyWord(String firstKeyWord) {
		this.firstKeyWord = firstKeyWord;
	}

	public String getSecondKeyWord() {
		return secondKeyWord;
	}

	public void setSecondKeyWord(String secondKeyWord) {
		this.secondKeyWord = secondKeyWord;
	}

	public String getThirdKeyWord() {
		return thirdKeyWord;
	}

	public void setThirdKeyWord(String thirdKeyWord) {
		this.thirdKeyWord = thirdKeyWord;
	}

	public String getFourthKeyWord() {
		return fourthKeyWord;
	}

	public void setFourthKeyWord(String fourthKeyWord) {
		this.fourthKeyWord = fourthKeyWord;
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
		return " GrammarRule : { Id : " + this.id +" , Title : " + this.title + " , Html description : " + this.htmlDescription + 
				" , First Key word : " + this.firstKeyWord + " , Second Key word : " + this.secondKeyWord + " , Third Key word : " + this.thirdKeyWord +
				" , Fourth Key word : " + this.fourthKeyWord +" , Version : " + this.version + " }" ;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((firstKeyWord == null) ? 0 : firstKeyWord.hashCode());
		result = prime * result + ((fourthKeyWord == null) ? 0 : fourthKeyWord.hashCode());
		result = prime * result + ((htmlDescription == null) ? 0 : htmlDescription.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((secondKeyWord == null) ? 0 : secondKeyWord.hashCode());
		result = prime * result + ((thirdKeyWord == null) ? 0 : thirdKeyWord.hashCode());
		result = prime * result + ((title == null) ? 0 : title.hashCode());
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
		GrammarRule other = (GrammarRule) obj;
		if (firstKeyWord == null) {
			if (other.firstKeyWord != null)
				return false;
		} else if (!firstKeyWord.equals(other.firstKeyWord))
			return false;
		if (fourthKeyWord == null) {
			if (other.fourthKeyWord != null)
				return false;
		} else if (!fourthKeyWord.equals(other.fourthKeyWord))
			return false;
		if (htmlDescription == null) {
			if (other.htmlDescription != null)
				return false;
		} else if (!htmlDescription.equals(other.htmlDescription))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (secondKeyWord == null) {
			if (other.secondKeyWord != null)
				return false;
		} else if (!secondKeyWord.equals(other.secondKeyWord))
			return false;
		if (thirdKeyWord == null) {
			if (other.thirdKeyWord != null)
				return false;
		} else if (!thirdKeyWord.equals(other.thirdKeyWord))
			return false;
		if (title == null) {
			if (other.title != null)
				return false;
		} else if (!title.equals(other.title))
			return false;
		return true;
	}

	
	
}
