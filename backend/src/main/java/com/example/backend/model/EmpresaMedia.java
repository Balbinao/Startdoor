package com.example.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "empresa_media")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class EmpresaMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal mediaAmbiente = BigDecimal.ZERO;
    private BigDecimal mediaAprendizado = BigDecimal.ZERO;
    private BigDecimal mediaBeneficios = BigDecimal.ZERO;
    private BigDecimal mediaCultura = BigDecimal.ZERO;
    private BigDecimal mediaEfetivacao = BigDecimal.ZERO;
    private BigDecimal mediaEntrevista = BigDecimal.ZERO;
    private BigDecimal mediaFeedback = BigDecimal.ZERO;
    private BigDecimal mediaInfraestrutura = BigDecimal.ZERO;
    private BigDecimal mediaIntegracao = BigDecimal.ZERO;
    private BigDecimal mediaRemuneracao = BigDecimal.ZERO;
    private BigDecimal mediaRotina = BigDecimal.ZERO;
    private BigDecimal mediaLideranca = BigDecimal.ZERO;

    @Column(name = "media_geral")
    private BigDecimal mediaGeral = BigDecimal.ZERO;

    @Column(name = "salario_min_piso", precision = 10, scale = 2)
    private BigDecimal salarioMinPiso;

    @Column(name = "salario_max_teto", precision = 10, scale = 2)
    private BigDecimal salarioMaxTeto;

    @Column(name = "salario_base_medio", precision = 10, scale = 2)
    private BigDecimal salarioBaseMedio;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}