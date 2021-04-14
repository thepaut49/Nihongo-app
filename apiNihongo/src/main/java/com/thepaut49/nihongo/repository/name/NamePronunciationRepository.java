package com.thepaut49.nihongo.repository.name;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thepaut49.nihongo.model.name.NamePronunciation;

public interface NamePronunciationRepository extends JpaRepository<NamePronunciation, Long> {

}
