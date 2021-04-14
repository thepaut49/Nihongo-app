package com.thepaut49.nihongo.repository.counter;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thepaut49.nihongo.model.counter.CounterPronunciation;


public interface CounterPronunciationRepository extends JpaRepository<CounterPronunciation, Long> {

}
