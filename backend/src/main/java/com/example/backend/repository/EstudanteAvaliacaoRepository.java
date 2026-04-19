package com.example.backend.repository;

import com.example.backend.model.EstudanteAvaliacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EstudanteAvaliacaoRepository extends JpaRepository<EstudanteAvaliacao, Long> {
    List<EstudanteAvaliacao> findByEmpresaId(Long empresaId);
    List<EstudanteAvaliacao> findByEstudanteId(Long estudanteId);
    boolean existsByEstudanteIdAndEmpresaId(Long estudanteId, Long empresaId);
}