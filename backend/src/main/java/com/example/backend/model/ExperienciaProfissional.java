package com.example.backend.model;

import com.example.backend.model.enums.ModeloTrabalho;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "estudante_exp_profi")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor

public class ExperienciaProfissional {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_estudante", nullable = false)
    private Estudante estudante;

    @ManyToOne
    @JoinColumn(name = "id_empresa")
    private Empresa empresa;

    @Column(name = "titulo_cargo", length = 60, nullable = false)
    private String tituloCargo;

    @Column(name = "estado_atuacao", length = 30, nullable = false)
    private String estadoAtuacao;

    @Column(name = "modelo_trabalho", nullable = false)
    private String modeloTrabalho;

    @Column(name = "data_inicio", nullable = false)
    private LocalDate dataInicio;

    @Column(name = "data_fim")
    private LocalDate dataFim;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
