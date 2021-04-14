package com.thepaut49.nihongo.repository.word;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thepaut49.nihongo.model.word.WordMeaning;

public interface WordMeaningRepository extends JpaRepository<WordMeaning, Long> {

}
