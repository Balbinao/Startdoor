package com.example.backend.security;

import com.example.backend.model.Estudante;
import com.example.backend.repository.EstudanteRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component("estudanteSecurity")
public class EstudanteSecurity {

    private final EstudanteRepository estudanteRepository;

    public EstudanteSecurity(EstudanteRepository estudanteRepository) {
        this.estudanteRepository = estudanteRepository;
    }

    public boolean isOwner(Long estudanteId) {
        // 1. Pega o usuário logado
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof UserDetails)) {
            return false;
        }

        String emailLogado = ((UserDetails) authentication.getPrincipal()).getUsername();
        
        // 2. Busca o estudante pelo ID
        var estudante = estudanteRepository.findById(estudanteId).orElse(null);
        if (estudante == null) {
            return false;
        }

        // 3. Verifica se o email do estudante é o mesmo do usuário logado
        return estudante.getEmail().equals(emailLogado);
    }
}