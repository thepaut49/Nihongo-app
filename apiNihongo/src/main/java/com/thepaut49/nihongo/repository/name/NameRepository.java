package com.thepaut49.nihongo.repository.name;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.thepaut49.nihongo.model.name.Name;

public interface NameRepository extends JpaRepository<Name, Long> {

	boolean existsByKanjis(String kanjis);

	Name findByKanjis(String kanjis);

	@Query("SELECT v FROM Name v WHERE (:kanjis is null or v.kanjis LIKE  LOWER(concat('%', concat(:kanjis, '%')))) "
			+ " and (:pronunciation is null or EXISTS(SELECT vp from NamePronunciation vp WHERE v.id = vp.name.id AND vp.pronunciation LIKE LOWER(concat('%', concat(:pronunciation, '%')))))"
			+ " and (:meaning is null or EXISTS(SELECT vm from NameMeaning vm WHERE v.id = vm.name.id AND vm.meaning LIKE LOWER(concat('%', concat(:meaning, '%')))))")
	List<Name> findWithCriteria(String kanjis, String pronunciation, String meaning);

	@Query(nativeQuery = true, value = "SELECT * FROM Name v ORDER BY v.number_of_use DESC LIMIT :quantity ")
	List<Name> findMostUsedNames(Integer quantity);

}
