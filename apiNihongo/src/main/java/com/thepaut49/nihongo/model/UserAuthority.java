package com.thepaut49.nihongo.model;

import javax.persistence.*;
import java.util.UUID;

@Entity(name="authorities")
public class UserAuthority {

    @Id
    UUID id;

    @JoinColumn(name = "user_id",referencedColumnName="username")
    @ManyToOne
    User user;

    @Column
    String authority;

    /*** getter /setter ***/
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    /*** Constructors ***/

    public UserAuthority() {
    }

    public UserAuthority(User user, String authority) {
        this.id = UUID.randomUUID();
        this.user = user;
        this.authority = authority;
    }


}
