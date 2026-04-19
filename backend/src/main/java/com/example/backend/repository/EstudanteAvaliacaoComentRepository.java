package com.example.backend.repository;

import com.example.backend.model.EstudanteAvaliacaoComent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EstudanteAvaliacaoComentRepository extends JpaRepository<EstudanteAvaliacaoComent, Long> {
    List<EstudanteAvaliacaoComent> findByAvaliacaoId(Long avaliacaoId);
}