package com.thepaut49.nihongo.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.thepaut49.nihongo.model.suffix.Suffix;

public interface SuffixRepository extends JpaRepository<Suffix, Long> {

	boolean existsByKanjis(String kanjis);

	Suffix findByKanjis(String kanjis);

}
