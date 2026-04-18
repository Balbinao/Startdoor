package com.example.backend.repository;

import com.example.backend.model.Estudante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface EstudanteRepository extends JpaRepository<Estudante, Long> {

    Optional<Estudante> findByUuid(String uuid);
    UserDetails findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByCpf (String cpf);
    boolean existsByUser(String user);
}
