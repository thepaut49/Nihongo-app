package com.thepaut49.nihongo.dto;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;


public class VisitStatsDTO {

    private Long id;

    private String ip;

    private LocalDate dateVisit;

    private int version;

    /*** getter / setter ***/

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public LocalDate getDateVisit() {
        return dateVisit;
    }

    public void setDateVisit(LocalDate dateVisit) {
        this.dateVisit = dateVisit;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }
}
