package com.example.backend.model;

import com.example.backend.model.enums.ModeloTrabalho;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "estudante")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of ="id")
public class Estudante implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String cpf;

    @Column(unique = true, name = "\"user\"")
    private String user;

    @Column(unique = true)
    private String email;

    private String senha;

    @Column(columnDefinition = "TEXT")
    private String biografia;

    @Column(name = "pais_origem")
    private String paisOrigem;

    @Column(name = "media_nota_geral")
    private BigDecimal mediaNotaGeral;

    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;

    @Enumerated(EnumType.STRING)
    @Column(name = "modelo_trabalho")
    private ModeloTrabalho modeloTrabalho;

    @Column(name = "estado_atuacao")
    private String estadoAtuacao;

    @Column(name = "setor_interesse")
    private String setorInteresse;

    @Column(name = "habilidades_principais")
    private String habilidadesPrincipais;

    @Column(name = "link_site")
    private String linkSite;

    @Column(name = "link_linkedin")
    private String linkLinkedin;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "estudante", cascade = CascadeType.ALL)
    private List<ExperienciaAcademica> experienciasAcademicas;

    @OneToMany(mappedBy = "estudante", cascade = CascadeType.ALL)
    private List<ExperienciaProfissional> experienciasProfissionais;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_ESTUDANTE"));
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
