package com.example.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "empresa")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of ="id")
public class Empresa implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "nome_fantasia")
    private String nomeFantasia;

    @NotBlank
    @Column(unique = true)
    private String cnpj;

    @Column(unique = true, name = "\"user\"")
    private String user;

    @Email
    @Column(unique = true)
    private String email;

    private String senha;

    @Column(name = "foto_url")
    private String fotoUrl;

    @Column(name = "media_nota_geral")
    private BigDecimal mediaNotaGeral;

    @Column(columnDefinition = "TEXT")
    private String biografia;

    @Column(name = "pais_origem")
    private String paisOrigem;

    @Column(name = "receita_anual")
    private String receitaAnual;

    @Column(name = "data_fundacao")
    private LocalDate dataFundacao;

    @Column(name = "tamanho_empresa")
    private String tamanhoEmpresa;

    @Column(name = "estado_sede")
    private String estadoSede;

    @Column(name = "media_salarial", precision = 7, scale = 2)
    private BigDecimal mediaSalarial;

    @Column(name = "area_atuacao")
    private String areaAtuacao;

    @Column(name = "link_site")
    private String linkSite;

    @Column(name = "link_linkedin")
    private String linkLinkedin;

    @Column(name = "link_gupy")
    private String linkGupy;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ExperienciaProfissional> experiencias;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public @Nullable String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
