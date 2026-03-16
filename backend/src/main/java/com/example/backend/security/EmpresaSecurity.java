package com.example.backend.security;

import com.example.backend.model.Empresa;
import com.example.backend.repository.EmpresaRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component("empresaSecurity")
public class EmpresaSecurity {

    private final EmpresaRepository empresaRepository;

    public EmpresaSecurity(EmpresaRepository empresaRepository) {
        this.empresaRepository = empresaRepository;
    }

    public boolean isOwner(Long empresaId) {
        // 1. Pega o usuário logado
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof UserDetails)) {
            return false;
        }

        String emailLogado = ((UserDetails) authentication.getPrincipal()).getUsername();
        
        // 2. Busca a empresa pelo ID
        var empresa = empresaRepository.findById(empresaId).orElse(null);
        if (empresa == null) {
            return false;
        }

        // 3. Verifica se o email da empresa é o mesmo do usuário logado
        return empresa.getEmail().equals(emailLogado);
    }
}