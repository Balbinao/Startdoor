package com.example.backend.security;

import com.example.backend.model.Estudante;
import com.example.backend.repository.EstudanteRepository;
import com.example.backend.repository.ExperienciaAcademicaRepository;
import com.example.backend.repository.ExperienciaProfissionalRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component("estudanteSecurity")
public class EstudanteSecurity {

    private final EstudanteRepository estudanteRepository;
    private final ExperienciaProfissionalRepository profissionalRepository;
    private final ExperienciaAcademicaRepository academicaRepository;

    public EstudanteSecurity(EstudanteRepository estudanteRepository, ExperienciaProfissionalRepository profissionalRepository, ExperienciaAcademicaRepository academicaRepository) {
        this.estudanteRepository = estudanteRepository;
        this.profissionalRepository = profissionalRepository;
        this.academicaRepository = academicaRepository;
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

    public boolean isOwnerOfProfissional(Long id) {
        String emailLogado = getEmailLogado();
        if (emailLogado == null) return false;

        return profissionalRepository.findById(id)
                .map(exp -> exp.getEstudante().getEmail().equals(emailLogado))
                .orElse(false);
    }

    public boolean isOwnerOfAcademica(Long id) {
        String emailLogado = getEmailLogado();
        if (emailLogado == null) return false;

        return academicaRepository.findById(id)
                .map(exp -> exp.getEstudante().getEmail().equals(emailLogado))
                .orElse(false);
    }

    private String getEmailLogado() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof UserDetails)) {
            return null;
        }
        return ((UserDetails) authentication.getPrincipal()).getUsername();
    }
}