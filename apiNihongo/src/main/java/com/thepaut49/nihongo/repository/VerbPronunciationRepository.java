package com.thepaut49.nihongo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thepaut49.nihongo.model.verb.VerbPronunciation;


public interface VerbPronunciationRepository extends JpaRepository<VerbPronunciation, Long> {

}
