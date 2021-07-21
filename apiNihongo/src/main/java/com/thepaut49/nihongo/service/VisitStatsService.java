package com.thepaut49.nihongo.service;

import com.thepaut49.nihongo.exception.ResourceAlreadyExistException;
import com.thepaut49.nihongo.model.VisitStats;
import com.thepaut49.nihongo.repository.VisitStatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class VisitStatsService {
	
	@Autowired
	private VisitStatsRepository visitStatsRepository;
	
	public VisitStats createVisitStats(VisitStats newVisitStats) {
		LocalDate today = LocalDate.now();
		if (!visitStatsRepository.existsByIpAndDateVisit(newVisitStats.getIp(), today)) {
			newVisitStats.setDateVisit(today);
			return visitStatsRepository.save(newVisitStats);
		} else {
			throw new ResourceAlreadyExistException("Visit already registered !");
		}
	}

	public VisitStats findById(Long id) {
		Optional<VisitStats> visitStats = visitStatsRepository.findById(id);
		if (!visitStats.isPresent()) {
			throw new ResourceNotFoundException("Could not found the VisitStats with id : " + id );
		}
		return visitStats.get();
	}

	public List<VisitStats> findByIp(String ip) {
		return visitStatsRepository.findByIp(ip);
	}

	public List<VisitStats> findByDateVisit(LocalDate dateVisit) {
		return visitStatsRepository.findByDateVisit(dateVisit);
	}
	
	public List<VisitStats> findAll() {
		return visitStatsRepository.findAll();
	}
}
