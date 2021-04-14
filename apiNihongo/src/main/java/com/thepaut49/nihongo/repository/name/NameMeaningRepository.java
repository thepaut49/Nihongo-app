package com.thepaut49.nihongo.repository.name;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thepaut49.nihongo.model.name.NameMeaning;

public interface NameMeaningRepository extends JpaRepository<NameMeaning, Long> {

}
