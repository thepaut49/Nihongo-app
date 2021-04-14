package com.thepaut49.nihongo.repository.word;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thepaut49.nihongo.model.word.WordPronunciation;

public interface WordPronunciationRepository extends JpaRepository<WordPronunciation, Long> {

}
