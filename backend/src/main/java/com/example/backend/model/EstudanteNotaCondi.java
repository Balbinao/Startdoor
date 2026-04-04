package com.example.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "estudante_nota_condi")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "estudante")
public class EstudanteNotaCondi {

    @Id
    @Column(name = "id_estudante")
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id_estudante")
    private Estudante estudante;

    @Column(nullable = false)
    private Integer ambiente;

    @Column(nullable = false)
    private Integer aprendizado;

    @Column(nullable = false)
    private Integer beneficios;

    @Column(nullable = false)
    private Integer cultura;

    @Column(nullable = false)
    private Integer efetivacao;

    @Column(nullable = false)
    private Integer entrevista;

    @Column(nullable = false)
    private Integer feedback;

    @Column(nullable = false)
    private Integer infraestrutura;

    @Column(nullable = false)
    private Integer integracao;

    @Column(nullable = false)
    private Integer remuneracao;

    @Column(nullable = false)
    private Integer rotina;

    @Column(nullable = false)
    private Integer lideranca;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
