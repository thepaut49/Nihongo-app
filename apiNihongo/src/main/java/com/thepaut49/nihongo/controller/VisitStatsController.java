package com.thepaut49.nihongo.controller;

import com.thepaut49.nihongo.dto.VisitStatsDTO;
import com.thepaut49.nihongo.mapper.VisitStatsToDTOMapper;
import com.thepaut49.nihongo.model.VisitStats;
import com.thepaut49.nihongo.service.VisitStatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://HOST_NAME:3000", maxAge = 3600)
@RestController
@RequestMapping("/visitStats")
public class VisitStatsController {

	@Autowired
	private VisitStatsService visitStatsService;

	@PostMapping("/create")
	public VisitStatsDTO createVisitStats( @RequestBody VisitStatsDTO visitStatsDTO) {
		VisitStats newVisitStats = VisitStatsToDTOMapper.map(visitStatsDTO);
		return VisitStatsToDTOMapper.map(visitStatsService.createVisitStats(newVisitStats));
	}

	@RolesAllowed("admin")
	@GetMapping(value = "/{id}")
	public VisitStatsDTO findById( @PathVariable Long id) {
		return VisitStatsToDTOMapper.map(visitStatsService.findById(id));
	}

	@RolesAllowed("admin")
	@GetMapping(value = "/findByIp/{ip}")
	public List<VisitStatsDTO> findByIp( @PathVariable String ip) {
		List<VisitStats> visitStatss = visitStatsService.findByIp(ip);
		return visitStatss
				.stream()
				.map(visitStats -> VisitStatsToDTOMapper.map(visitStats))
				.collect(Collectors.toList());
	}

	@RolesAllowed("admin")
	@GetMapping(value = "/findByDateVisit/{dateVisit}")
	public List<VisitStatsDTO> findByDateVisit(@PathVariable LocalDate dateVisit) {
		List<VisitStats> visitStatss = visitStatsService.findByDateVisit(dateVisit);
		return visitStatss
				.stream()
				.map(visitStats -> VisitStatsToDTOMapper.map(visitStats))
				.collect(Collectors.toList());
	}

	@RolesAllowed("admin")
	@GetMapping("/all")
	public List<VisitStatsDTO> findAll() {
		List<VisitStats> visitStatss = visitStatsService.findAll();
		return visitStatss
				.stream()
				.map(visitStats -> VisitStatsToDTOMapper.map(visitStats))
				.collect(Collectors.toList());
	}
}














