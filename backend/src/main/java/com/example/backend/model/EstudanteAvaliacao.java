package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "estudante_avaliacao")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class EstudanteAvaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String uuid;

    @ManyToOne
    @JoinColumn(name = "id_estudante", nullable = false)
    private Estudante estudante;

    @ManyToOne
    @JoinColumn(name = "id_empresa", nullable = false)
    private Empresa empresa;

    @ManyToOne
    @JoinColumn(name = "id_setor", nullable = false)
    private Setor setor;

    @Column(name = "estado_atuacao", length = 30, nullable = false)
    private String estadoAtuacao;

    @Column(name = "modelo_trabalho", nullable = false)
    private String modeloTrabalho;

    @Column(name = "data_inicio", nullable = false)
    private LocalDate dataInicio;

    @Column(name = "data_fim")
    private LocalDate dataFim;

    @Column(name = "titulo_cargo", length = 60, nullable = false)
    private String tituloCargo;

    @Column(name = "texto_avaliacao", columnDefinition = "TEXT", nullable = false)
    private String textoAvaliacao;

    @Column(name = "salario_min", precision = 7, scale = 2, nullable = false)
    private BigDecimal salarioMin;

    @Column(name = "salario_max", precision = 7, scale = 2, nullable = false)
    private BigDecimal salarioMax;

    @Column(name = "anonima", nullable = false)
    private Boolean anonima = false;

    @Column(name = "ambiente", nullable = false)
    private Integer ambiente;

    @Column(name = "aprendizado", nullable = false)
    private Integer aprendizado;

    @Column(name = "beneficios", nullable = false)
    private Integer beneficios;

    @Column(name = "cultura", nullable = false)
    private Integer cultura;

    @Column(name = "efetivacao", nullable = false)
    private Integer efetivacao;

    @Column(name = "entrevista", nullable = false)
    private Integer entrevista;

    @Column(name = "feedback", nullable = false)
    private Integer feedback;

    @Column(name = "infraestrutura", nullable = false)
    private Integer infraestrutura;

    @Column(name = "integracao", nullable = false)
    private Integer integracao;

    @Column(name = "remuneracao", nullable = false)
    private Integer remuneracao;

    @Column(name = "rotina", nullable = false)
    private Integer rotina;

    @Column(name = "lideranca", nullable = false)
    private Integer lideranca;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "avaliacao", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<EstudanteAvaliacaoComent> comentariosEstudante;

    @OneToMany(mappedBy = "avaliacao", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<EmpresaAvaliacaoComent> comentariosEmpresa;

    @PrePersist
    public void generateUuid() {
        if (this.uuid == null) {
            this.uuid = UUID.randomUUID().toString();
        }
    }
}