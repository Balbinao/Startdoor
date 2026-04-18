package com.example.backend.security;

import com.example.backend.model.Estudante;
import com.example.backend.repository.EstudanteRepository;
import com.example.backend.repository.ExperienciaAcademicaRepository;
import com.example.backend.repository.ExperienciaProfissionalRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Objects;

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
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof UserDetails userDetails)) {
            return false;
        }

        String uuidLogado = userDetails.getUsername();
        
        var estudante = estudanteRepository.findById(estudanteId).orElse(null);
        if (estudante == null) {
            return false;
        }

        return Objects.equals(estudante.getUuid(), uuidLogado);
    }

    public boolean isOwnerOfProfissional(Long id) {
        String uuidLogado = getUuidLogado();
        if (uuidLogado == null) return false;

        return profissionalRepository.findById(id)
                .map(exp -> Objects.equals(exp.getEstudante().getUuid(), uuidLogado))
                .orElse(false);
    }

    public boolean isOwnerOfAcademica(Long id) {
        String uuidLogado = getUuidLogado();
        if (uuidLogado == null) return false;

        return academicaRepository.findById(id)
                .map(exp -> Objects.equals(exp.getEstudante().getUuid(), uuidLogado))
                .orElse(false);
    }

    private String getUuidLogado() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof UserDetails userDetails)) {
            return null;
        }
        return userDetails.getUsername();
    }
}