package com.thepaut49.nihongo.model;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;


@Entity
public class VisitStats implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String ip;

    @Column(nullable = false)
    private LocalDate dateVisit;

    @Version
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

    /*** methods ***/
    @Override
    public String toString() {
        return "VisitStat : { id: "+ id + ", ip: " + ip + ", dateVisit: "+  dateVisit + ", version: " + version + " }";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        VisitStats message1 = (VisitStats) o;

        if (!id.equals(message1.id)) return false;
        if (!ip.equals(message1.ip)) return false;
        return dateVisit.equals(message1.dateVisit);
    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
        result = 31 * result + ip.hashCode();
        result = 31 * result + dateVisit.hashCode();
        return result;
    }
}
