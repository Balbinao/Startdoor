package com.example.backend.repository;

import com.example.backend.modelRepository.Estudante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface EstudanteRepository extends JpaRepository<Estudante, Long> {

    UserDetails findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByCpf (String cpf);
    boolean existsByUser(String user);
}
