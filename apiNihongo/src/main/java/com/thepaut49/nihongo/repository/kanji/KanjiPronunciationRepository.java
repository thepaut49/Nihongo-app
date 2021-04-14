package com.thepaut49.nihongo.repository.kanji;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thepaut49.nihongo.model.kanji.KanjiPronunciation;

public interface KanjiPronunciationRepository extends JpaRepository<KanjiPronunciation, Long> {

}
