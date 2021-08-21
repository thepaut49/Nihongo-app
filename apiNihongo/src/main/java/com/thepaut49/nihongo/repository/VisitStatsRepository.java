package com.thepaut49.nihongo.repository;

import com.thepaut49.nihongo.model.Message;
import com.thepaut49.nihongo.model.VisitStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface VisitStatsRepository extends JpaRepository<VisitStats, Long> {

    List<VisitStats> findByDateVisit(LocalDate dateVisit);

}
