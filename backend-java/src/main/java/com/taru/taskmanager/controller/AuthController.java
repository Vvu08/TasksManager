package com.taru.taskmanager.controller;

import com.taru.taskmanager.dto.LoginDTO;
import com.taru.taskmanager.dto.UserDTO;
import com.taru.taskmanager.exception.UserAlreadyExistsException;
import com.taru.taskmanager.exception.UserNotFoundException;
import com.taru.taskmanager.exception.WrongPasswordException;
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
    public ResponseEntity<UserDTO> registerUser(@RequestBody UserDTO userDTO) {

        if (userService.existsByUsername(userDTO.getUsername())) {
            throw new UserAlreadyExistsException("User with username = " + userDTO.getUsername() + " - already exists!");
        } else if (userService.existsByEmail(userDTO.getEmail())) {
            throw new UserAlreadyExistsException("User with email = " + userDTO.getEmail() + " - already exists!");
        }

        userDTO = userService.createUser(userDTO);

        return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> loginUser(@RequestBody LoginDTO loginDTO) {

        if (!userService.existsByUsername(loginDTO.getUsername())) {
            throw new UserNotFoundException("User with username = " + loginDTO.getUsername() + " - not found!");
        }

        User user = userRepository.findByUsername(loginDTO.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User with username = " + loginDTO.getUsername() + " - not found!"));

        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new WrongPasswordException("Wrong password!");
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDTO.getUsername(),
                        loginDTO.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return new ResponseEntity<>(userService.getUserById(user.getId()), HttpStatus.OK);
    }
}
