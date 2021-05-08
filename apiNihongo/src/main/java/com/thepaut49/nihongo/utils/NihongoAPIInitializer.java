package com.thepaut49.nihongo.utils;

import com.thepaut49.nihongo.model.User;
import com.thepaut49.nihongo.repository.UserRepository;
import org.springframework.beans.factory.SmartInitializingSingleton;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class NihongoAPIInitializer implements SmartInitializingSingleton {

    private final UserRepository users;
    private final PasswordEncoder passwordEncoder;

    public NihongoAPIInitializer(UserRepository users, PasswordEncoder passwordEncoder) {
        this.users = users;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public void afterSingletonsInstantiated() {

        UUID joshId = UUID.randomUUID();
        UUID carolId = UUID.randomUUID();

        User josh = new User(joshId,"josh",this.passwordEncoder.encode("josh"));
        josh.grantAuthority("READ");
        User carol = new User(carolId,"carol",this.passwordEncoder.encode("carol"));
        carol.grantAuthority("READ");
        carol.grantAuthority("WRITE");
        if (users.findByUsername(josh.getUsername()) == null) {
            users.save(josh);
            users.save(carol);
        }
    }
}
