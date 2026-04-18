package com.example.backend.security;

import com.example.backend.model.Empresa;
import com.example.backend.repository.EmpresaRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component("empresaSecurity")
public class EmpresaSecurity {

    private final EmpresaRepository empresaRepository;

    public EmpresaSecurity(EmpresaRepository empresaRepository) {
        this.empresaRepository = empresaRepository;
    }

    public boolean isOwner(Long empresaId) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof UserDetails userDetails)) {
            return false;
        }

        String uuidLogado = userDetails.getUsername();
        
        var empresa = empresaRepository.findById(empresaId).orElse(null);
        if (empresa == null) {
            return false;
        }

        return Objects.equals(empresa.getUuid(), uuidLogado);
    }
}