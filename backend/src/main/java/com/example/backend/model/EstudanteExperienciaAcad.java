package com.example.backend.model;

import com.example.backend.model.enums.ModeloTrabalho; // Vamos reaproveitar o enum que você já tem
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "estudante_exp_acade")
@Getter @Setter
public class EstudanteExperienciaAcad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_estudante", nullable = false)
    private Estudante estudante;

    @Column(name = "titulo_ensino", length = 60, nullable = false)
    private String tituloEnsino;

    @Column(name = "nome_escola", length = 60, nullable = false)
    private String nomeEscola;

    @Column(name = "estado_atuacao", length = 30, nullable = false)
    private String estadoAtuacao;

    @Enumerated(EnumType.STRING)
    @Column(name = "modelo_ensino", nullable = false)
    private ModeloTrabalho modeloEnsino;

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
