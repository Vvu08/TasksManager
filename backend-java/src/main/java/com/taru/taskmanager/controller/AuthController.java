package com.taru.taskmanager.controller;

import com.taru.taskmanager.dto.LoginDTO;
import com.taru.taskmanager.dto.UserDTO;
import com.taru.taskmanager.models.User;
import com.taru.taskmanager.repository.UserRepository;
import com.taru.taskmanager.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager, UserService userService, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDTO userDTO) {

        if (userService.existsByUsername(userDTO.getUsername())) {
            return new ResponseEntity<>("Username is taken!", HttpStatus.BAD_REQUEST);
        } else if (userService.existsByEmail(userDTO.getEmail())) {
            return new ResponseEntity<>("Email is taken!", HttpStatus.BAD_REQUEST);
        }

        userDTO = userService.createUser(userDTO);

        return new ResponseEntity<>("User registered with id = " + userDTO.getId(), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginDTO loginDTO) {

        if (userService.existsByUsername(loginDTO.getUsername())) {

            User user = userRepository.findByUsername(loginDTO.getUsername()).get();

            if (passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {

                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                loginDTO.getUsername(),
                                loginDTO.getPassword()
                        )
                );

                SecurityContextHolder.getContext().setAuthentication(authentication);

                return new ResponseEntity<>("User sign with id = " + user.getId(), HttpStatus.OK);
            }

            return new ResponseEntity<>("Wrong password!", HttpStatus.BAD_REQUEST);

        }
        return new ResponseEntity<>("User with username = \"" + loginDTO.getUsername() + "\" - not found!", HttpStatus.BAD_REQUEST);
    }
}
