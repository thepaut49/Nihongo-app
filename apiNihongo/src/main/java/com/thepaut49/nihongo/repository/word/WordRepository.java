package com.thepaut49.nihongo.repository.word;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.thepaut49.nihongo.model.word.Word;

public interface WordRepository extends JpaRepository<Word, Long> {

	boolean existsByKanjis(String kanjis);

	Word findByKanjis(String kanjis);

	@Query("SELECT v FROM Word v WHERE (:kanjis is null or v.kanjis LIKE  LOWER(concat('%', concat(:kanjis, '%')))) "
			+ " and (:pronunciation is null or EXISTS(SELECT vp from WordPronunciation vp WHERE v.id = vp.word.id AND vp.pronunciation LIKE LOWER(concat('%', concat(:pronunciation, '%')))))"
			+ " and (:meaning is null or EXISTS(SELECT vm from WordMeaning vm WHERE v.id = vm.word.id AND vm.meaning LIKE LOWER(concat('%', concat(:meaning, '%')))))")
	List<Word> findWithCriteria(String kanjis, String pronunciation, String meaning);

	@Query(nativeQuery = true, value = "SELECT * FROM Word v ORDER BY v.number_of_use DESC LIMIT :quantity ")
	List<Word> findMostUsedWords(Integer quantity);

}
