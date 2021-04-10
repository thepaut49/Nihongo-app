package com.thepaut49.nihongo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.thepaut49.nihongo.model.iadjective.IAdjective;

public interface IAdjectiveRepository extends JpaRepository<IAdjective, Integer> {

	boolean existsByKanjis(String kanjis);

	IAdjective findByKanjis(String kanjis);

	@Query("SELECT v FROM IAdjective v WHERE (:kanjis is null or v.kanjis LIKE  LOWER(concat('%', concat(:kanjis, '%')))) "
			+ " and (:pronunciation is null or EXISTS(SELECT vp from IAdjectivePronunciation vp WHERE v.id = vp.iAdjectiveId AND vp.pronunciation LIKE LOWER(concat('%', concat(:pronunciation, '%')))))"
			+ " and (:meaning is null or EXISTS(SELECT vm from IAdjectiveMeaning vm WHERE v.id = vm.iAdjectiveId AND vm.meaning LIKE LOWER(concat('%', concat(:meaning, '%')))))")
	List<IAdjective> findWithCriteria(String kanjis, String pronunciation, String meaning);

	@Query(nativeQuery = true, value = "SELECT * FROM iadjective v ORDER BY v.number_of_use DESC LIMIT :quantity ")
	List<IAdjective> findMostUsedIAdjectives(Integer quantity);

}
