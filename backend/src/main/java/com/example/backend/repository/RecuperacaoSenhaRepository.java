package com.example.backend.repository;

import com.example.backend.model.RecuperacaoSenha;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface RecuperacaoSenhaRepository extends JpaRepository<RecuperacaoSenha, Long> {

    Optional<RecuperacaoSenha> findByEmailAndCodigoAndUtilizadoFalseAndDataExpiracaoAfter(
            String email, String codigo, LocalDateTime now);

    void deleteByEmailAndUtilizadoTrue(String email);
}
