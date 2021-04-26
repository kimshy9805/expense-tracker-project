package com.kay.expensetracker.user;

//import com.kay.expensetracker.registration.token.ConfirmationToken;
//import com.kay.expensetracker.registration.token.ConfirmationTokenService;
import com.kay.expensetracker.registration.RegistrationRequest;
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
public class UserService implements UserDetailsService {
    Logger logger = LoggerFactory.getLogger(UserService.class);
    private final static String USER_NOT_FOUND_MSG = "user with email %s not found";
    @Autowired
    private UserRepository userRepository;
//    @Autowired
//    private BCryptPasswordEncoder bCryptPasswordEncoder;
//    @Autowired
//    private ConfirmationTokenService confirmationTokenService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return (UserDetails) userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email)));
    }

//    //first check if request user is already exist.
    @Transactional
    public String signUpUser(RegistrationRequest request) {
        boolean isUserExist = userRepository.findByEmail(request.getEmail())
                .isPresent();

        logger.info(String.valueOf(isUserExist));

        if (isUserExist) {
            throw new IllegalStateException("the email is already taken.");
        }

        User user = new User(request.getFullName(), request.getEmail(), request.getPassword(), UserRole.USER);
//        String encodePassword = bCryptPasswordEncoder.encode(user.getPassword());
//        user.setPassword(encodePassword);
//
        userRepository.save(user);
        return "Successfully register the user";
    }
//
//    public String createToken(User user) {
//        String token = UUID.randomUUID().toString();
//        ConfirmationToken confirmationToken = new ConfirmationToken(
//                token,
//                LocalDateTime.now(),
//                LocalDateTime.now().plusMinutes(15),
//                user
//        );
//        //place where save token to db
//        confirmationTokenService.saveConfirmationToken(confirmationToken);
//        return token;
//    }
//
//    public void enableAppUser(String email) {
//        userRepository.enableAppUser(email);
//    }

}


//todo: find a way to check if db object is same as user. Not by just name
//            if (userRepository.findByLastName(user.getLastName()).equals(user.getLastName())
//                    && userRepository.findByFirstName(user.getFirstName()).equals(user.getFirstName())) {
//                logger.info("yes they are same");
//                token = createToken(user);
//                //should not save existing user
//                return new ExistingUser(true, token);
//            } else {
//                throw new IllegalStateException("email already taken");
//            }