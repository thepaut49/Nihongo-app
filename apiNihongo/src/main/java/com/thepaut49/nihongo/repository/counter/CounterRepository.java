package com.thepaut49.nihongo.repository.counter;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.thepaut49.nihongo.model.counter.Counter;

public interface CounterRepository extends JpaRepository<Counter, Long> {

	boolean existsByKanjis(String kanjis);

	Counter findByKanjis(String kanjis);

	@Query("SELECT v FROM Counter v WHERE (:kanjis is null or v.kanjis LIKE  LOWER(concat('%', concat(:kanjis, '%')))) "
			+ " and (:pronunciation is null or EXISTS(SELECT vp from CounterPronunciation vp WHERE v.id = vp.counterId AND vp.pronunciation LIKE LOWER(concat('%', concat(:pronunciation, '%')))))"
			+ " and (:use is null or v.use LIKE  LOWER(concat('%', concat(:use, '%'))))")
	List<Counter> findWithCriteria(String kanjis, String pronunciation, String use);

	@Query(nativeQuery = true, value = "SELECT * FROM tcounter v ORDER BY v.number_of_use DESC LIMIT :quantity ")
	List<Counter> findMostUsedCounters(Integer quantity);

}
