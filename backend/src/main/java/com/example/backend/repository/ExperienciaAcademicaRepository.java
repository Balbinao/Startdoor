package com.example.backend.repository;

import com.example.backend.model.ExperienciaAcademica;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExperienciaAcademicaRepository extends JpaRepository<ExperienciaAcademica, Long> {
    List<ExperienciaAcademica> findByEstudanteId(Long estudanteId);
}
