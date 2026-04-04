package com.example.backend.repository;

import com.example.backend.model.EstudanteNotaCondi;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EstudanteNotaCondiRepository extends JpaRepository<EstudanteNotaCondi, Long> {
    Optional<EstudanteNotaCondi> findByEstudanteId(Long estudanteId);
    boolean existsByEstudanteId(Long estudanteId);
}
