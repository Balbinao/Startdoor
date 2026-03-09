package com.example.backend.repository;

import com.example.backend.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

    UserDetails findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByCnpj(String cnpj);
}
