package com.thepaut49.nihongo.mapper;

import com.thepaut49.nihongo.dto.VisitStatsDTO;
import com.thepaut49.nihongo.model.VisitStats;

public class VisitStatsToDTOMapper {
	
	public static VisitStatsDTO map(VisitStats visitStats) {
		VisitStatsDTO visitStatsDTO = new VisitStatsDTO();
		visitStatsDTO.setId(visitStats.getId());
		visitStatsDTO.setIp(visitStats.getIp());
		visitStatsDTO.setDateVisit(visitStats.getDateVisit());
		visitStatsDTO.setVersion(visitStats.getVersion());
		return visitStatsDTO;
	}
	
	public static VisitStats map(VisitStatsDTO visitStatsDTO) {
		VisitStats visitStats = new VisitStats();
		visitStats.setId(visitStatsDTO.getId());
		visitStats.setIp(visitStatsDTO.getIp());
		visitStats.setDateVisit(visitStatsDTO.getDateVisit());
		visitStats.setVersion(visitStatsDTO.getVersion());
		return visitStats;
	}

}
