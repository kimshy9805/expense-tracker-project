package com.kay.expensetracker.appuser;

import com.kay.expensetracker.registration.token.ConfirmationToken;
import com.kay.expensetracker.registration.token.ConfirmationTokenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicReference;

/*
    service where it find user once login
 */
// 그때 안되는 이유가 autowire를 consstuctor 형식으로 안받아서 bean initialize가 안되는걸수도 있음. 추후 확인!


@Service
public class AppUserService implements UserDetailsService {
    Logger logger = LoggerFactory.getLogger(AppUserService.class);
    private final static String USER_NOT_FOUND_MSG = "user with email %s not found";
    @Autowired
    private AppUserRepository appUserRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private ConfirmationTokenService confirmationTokenService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return appUserRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email)));
    }

    //first check if request user is already exist.
    @Transactional
    public String signUpUser(AppUser appUser) {
        String token;
        boolean isUserExist = appUserRepository.findByEmail(appUser.getEmail())
                .isPresent();

        logger.info(String.valueOf(isUserExist));

        if (isUserExist) {
            Optional<AppUser> temp = appUserRepository.findByEmail(appUser.getEmail());
            AppUser exist = temp.get();
            token = createToken(exist);
        } else {
            logger.info("hi");
            //encode password and set the encoded pw.
            String encodePassword = bCryptPasswordEncoder.encode(appUser.getPassword());
            appUser.setPassword(encodePassword);

            //save 해도 enable되지 않음. token으로 enable.
            appUserRepository.save(appUser);

            //create token.
            token = createToken(appUser);
        }
        return token;
    }

    public String createToken(AppUser appUser) {
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                appUser
        );
        //place where save token to db
        confirmationTokenService.saveConfirmationToken(confirmationToken);
        return token;
    }

    public void enableAppUser(String email) {
        appUserRepository.enableAppUser(email);
    }

}


//todo: find a way to check if db object is same as appUser. Not by just name
//            if (appUserRepository.findByLastName(appUser.getLastName()).equals(appUser.getLastName())
//                    && appUserRepository.findByFirstName(appUser.getFirstName()).equals(appUser.getFirstName())) {
//                logger.info("yes they are same");
//                token = createToken(appUser);
//                //should not save existing user
//                return new ExistingUser(true, token);
//            } else {
//                throw new IllegalStateException("email already taken");
//            }