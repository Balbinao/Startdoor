package com.example.backend.service;

import com.example.backend.repository.AdminRepository;
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
    private final AdminRepository adminRepository;  

    public AuthService(
            EstudanteRepository estudanteRepository, 
            EmpresaRepository empresaRepository,
            AdminRepository adminRepository) {  
        this.estudanteRepository = estudanteRepository;
        this.empresaRepository = empresaRepository;
        this.adminRepository = adminRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 1. Tenta como estudante
        UserDetails user = estudanteRepository.findByEmail(username);
        if (user != null) return user;
        
        // 2. Tenta como empresa
        user = empresaRepository.findByEmail(username);
        if (user != null) return user;
        
        // 3. Tenta como admin
        user = adminRepository.findByEmail(username);
        if (user != null) return user;
        
        // 4. Se não encontrou ninguém
        throw new UsernameNotFoundException("Usuário não encontrado com o e-mail: " + username);
    }
}