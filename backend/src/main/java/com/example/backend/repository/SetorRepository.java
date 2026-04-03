package com.example.backend.repository;

import com.example.backend.model.Setor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SetorRepository extends JpaRepository<Setor, Long> {
    Optional<Setor> findByNome(String nome);
    boolean existsByNome(String nome);
}
