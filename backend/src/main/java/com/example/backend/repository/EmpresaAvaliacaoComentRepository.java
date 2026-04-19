package com.example.backend.repository;

import com.example.backend.model.EmpresaAvaliacaoComent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmpresaAvaliacaoComentRepository extends JpaRepository<EmpresaAvaliacaoComent, Long> {
    List<EmpresaAvaliacaoComent> findByAvaliacaoId(Long avaliacaoId);
}