package com.taru.taskmanager.service.impl;

import com.taru.taskmanager.exception.RoleNotFoundException;
import com.taru.taskmanager.exception.UserNotFoundException;
import com.taru.taskmanager.models.Role;
import com.taru.taskmanager.models.User;
import com.taru.taskmanager.models.UserRole;
import com.taru.taskmanager.repository.UserRepository;
import com.taru.taskmanager.repository.UserRoleRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;

    public CustomUserDetailsService(UserRepository userRepository, UserRoleRepository userRoleRepository) {
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User with username = " + username + " - not found!"));
        UserRole userRole = userRoleRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RoleNotFoundException("User with id = " + user.getId() + " - don't have a role!"));
        List<Role> roles = Collections.singletonList(userRole.getRole());

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                mapRoleToList(roles)
        );
    }

    private Collection<GrantedAuthority> mapRoleToList(List<Role> roles) {
        return roles.stream()
                .map(r -> new SimpleGrantedAuthority(r.getType()))
                .collect(Collectors.toList());
    }
}
