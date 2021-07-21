package com.thepaut49.nihongo.model;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;


@Entity
public class Message implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private LocalDate dateCreation;

    @Version
    private int version;

    /*** getter / setter ***/

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDate getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(LocalDate dateCreation) {
        this.dateCreation = dateCreation;
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
        return "Message : { id: "+ id + ", email: " + email + ", title: "+  title + ", content: "+ content + " }";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Message message1 = (Message) o;

        if (!id.equals(message1.id)) return false;
        if (!email.equals(message1.email)) return false;
        if (!title.equals(message1.title)) return false;
        if (!content.equals(message1.content)) return false;
        return dateCreation.equals(message1.dateCreation);
    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
        result = 31 * result + email.hashCode();
        result = 31 * result + title.hashCode();
        result = 31 * result + content.hashCode();
        result = 31 * result + dateCreation.hashCode();
        return result;
    }
}
