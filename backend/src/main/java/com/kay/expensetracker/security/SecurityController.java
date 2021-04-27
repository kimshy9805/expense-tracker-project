package com.kay.expensetracker.security;


import com.kay.expensetracker.expense.ExpenseController;
import com.kay.expensetracker.registration.RegistrationRequest;
import com.kay.expensetracker.security.model.AuthenticationRequest;
import com.kay.expensetracker.security.model.AuthenticationResponse;
import com.kay.expensetracker.user.UserService;
import com.kay.expensetracker.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/expense-tracker/auth")
public class SecurityController {
    Logger logger = LoggerFactory.getLogger(SecurityController.class);

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;

    //token 주는건데 login 이라고 생각하면될듯?
    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken (@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password" + e);
        }
        logger.info("successfully authenticated");

        final UserDetails userDetails = userService
                .loadUserByUsername(authenticationRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }

    @PostMapping("/registration")
    public String registerUser (@RequestBody RegistrationRequest request) {
        return userService.signUpUser(request);
    }

}
