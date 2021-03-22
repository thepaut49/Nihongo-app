package com.thepaut49.nihongo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.thepaut49.nihongo.model.Sentence;

public interface SentenceRepository extends JpaRepository<Sentence, Integer> {

	boolean existsByKanjis(String kanjis);

	Sentence findByKanjis(String kanjis);

	@Query("SELECT v FROM Sentence v WHERE (:kanjis is null or v.kanjis LIKE  LOWER(concat('%', concat(:kanjis, '%')))) "
			+ " and (:pronunciation is null or v.pronunciation LIKE  LOWER(concat('%', concat(:pronunciation, '%'))))"
			+ " and (:topic is null or v.topic LIKE  LOWER(concat('%', concat(:topic, '%'))))"
			+ " and (:meaning is null or v.meaning LIKE  LOWER(concat('%', concat(:meaning, '%'))))")
	List<Sentence> findWithCriteria(String kanjis, String pronunciation, String meaning, String topic);

}
