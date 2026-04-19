package com.example.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "empresa_setor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@IdClass(EmpresaSetorId.class)
public class EmpresaSetor implements Serializable {

    @Id
    @Column(name = "id_empresa")
    private Long empresaId;

    @Id
    @Column(name = "id_setor")
    private Long setorId;

    @ManyToOne
    @JoinColumn(name = "id_empresa", insertable = false, updatable = false)
    private Empresa empresa;

    @ManyToOne
    @JoinColumn(name = "id_setor", insertable = false, updatable = false)
    private Setor setor;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        if (empresa != null) this.empresaId = empresa.getId();
        if (setor != null) this.setorId = setor.getId();
    }
}