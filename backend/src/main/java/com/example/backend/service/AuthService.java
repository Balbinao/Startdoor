package com.example.backend.service;

import com.example.backend.repository.EmpresaRepository;
import com.example.backend.repository.EstudanteRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements UserDetailsService {

    private final EstudanteRepository estudanteRepository;
    private final EmpresaRepository empresaRepository;


    public AuthService(EstudanteRepository estudanteRepository, EmpresaRepository empresaRepository) {
        this.estudanteRepository = estudanteRepository;
        this.empresaRepository = empresaRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDetails user = estudanteRepository.findByEmail(username);

        if (user == null) {
            user = empresaRepository.findByEmail(username);
        }
        if (user == null) {
            throw new UsernameNotFoundException("Usuário não encontrado com o e-mail: " + username);
        }
        return user;
    }
}
