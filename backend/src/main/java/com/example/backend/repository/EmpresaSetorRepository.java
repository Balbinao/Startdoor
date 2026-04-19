package com.example.backend.repository;

import com.example.backend.model.EmpresaSetor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmpresaSetorRepository extends JpaRepository<EmpresaSetor, Long> {
    List<EmpresaSetor> findByEmpresaId(Long empresaId);
    boolean existsByEmpresaIdAndSetorId(Long empresaId, Long setorId);
    void deleteByEmpresaIdAndSetorId(Long empresaId, Long setorId);
}