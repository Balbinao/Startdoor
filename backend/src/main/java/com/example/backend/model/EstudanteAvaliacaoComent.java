package com.example.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "estudante_avaliacao_coment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class EstudanteAvaliacaoComent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String uuid;

    @ManyToOne
    @JoinColumn(name = "id_estudante", nullable = false)
    private Estudante estudante;

    @ManyToOne
    @JoinColumn(name = "id_avaliacao", nullable = false)
    private EstudanteAvaliacao avaliacao;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String texto;

    @Column(name = "anonima", nullable = false)
    private Boolean anonima = false;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    public void generateUuid() {
        if (this.uuid == null) {
            this.uuid = UUID.randomUUID().toString();
        }
    }
}