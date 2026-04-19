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
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        // Busca por UUID (para validação de token)
        var estudante = estudanteRepository.findByUuid(identifier);
        if (estudante.isPresent()) return estudante.get();
        
        var empresa = empresaRepository.findByUuid(identifier);
        if (empresa.isPresent()) return empresa.get();
        
        var admin = adminRepository.findByUuid(identifier);
        if (admin.isPresent()) return admin.get();
        
        // Busca por email (para login)
        UserDetails user = estudanteRepository.findByEmail(identifier);
        if (user != null) return user;
        
        user = empresaRepository.findByEmail(identifier);
        if (user != null) return user;
        
        user = adminRepository.findByEmail(identifier);
        if (user != null) return user;
        
        throw new UsernameNotFoundException("Usuário não encontrado: " + identifier);
    }
}