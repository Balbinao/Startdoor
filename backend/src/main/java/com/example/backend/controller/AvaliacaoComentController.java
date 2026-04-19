package com.example.backend.controller;

import com.example.backend.dto.AvaliacaoComentDTO;
import com.example.backend.dto.AvaliacaoComentResponseDTO;
import com.example.backend.dto.EmpresaAvaliacaoComentResponseDTO;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Empresa;
import com.example.backend.model.Estudante;
import com.example.backend.model.EstudanteAvaliacao;
import com.example.backend.model.EstudanteAvaliacaoComent;
import com.example.backend.model.EmpresaAvaliacaoComent;
import com.example.backend.openapi.AvaliacaoComentControllerOpenApi;
import com.example.backend.repository.EmpresaRepository;
import com.example.backend.repository.EstudanteRepository;
import com.example.backend.repository.EstudanteAvaliacaoRepository;
import com.example.backend.repository.EstudanteAvaliacaoComentRepository;
import com.example.backend.repository.EmpresaAvaliacaoComentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("avaliacoes")
public class AvaliacaoComentController implements AvaliacaoComentControllerOpenApi {
    private final EstudanteAvaliacaoComentRepository comentarioRepository;
    private final EmpresaAvaliacaoComentRepository empresaComentarioRepository;
    private final EstudanteAvaliacaoRepository avaliacaoRepository;
    private final EstudanteRepository estudanteRepository;
    private final EmpresaRepository empresaRepository;

    public AvaliacaoComentController(EstudanteAvaliacaoComentRepository comentarioRepository,
                                     EmpresaAvaliacaoComentRepository empresaComentarioRepository,
                                     EstudanteAvaliacaoRepository avaliacaoRepository,
                                     EstudanteRepository estudanteRepository,
                                     EmpresaRepository empresaRepository) {
        this.comentarioRepository = comentarioRepository;
        this.empresaComentarioRepository = empresaComentarioRepository;
        this.avaliacaoRepository = avaliacaoRepository;
        this.estudanteRepository = estudanteRepository;
        this.empresaRepository = empresaRepository;
    }

    @GetMapping("/{avaliacaoId}/comentarios-estudante")
    public ResponseEntity<List<AvaliacaoComentResponseDTO>> listarComentarios(@PathVariable Long avaliacaoId) {
        return ResponseEntity.ok(comentarioRepository.findByAvaliacaoId(avaliacaoId)
                .stream()
                .map(this::toComentResponseDTO)
                .toList());
    }

    @PostMapping("/{avaliacaoId}/comentarios-estudante")
    @PreAuthorize("hasRole('ESTUDANTE') or hasRole('ADMIN')")
    public ResponseEntity<?> criarComentario(@PathVariable Long avaliacaoId, @RequestBody AvaliacaoComentDTO dto) {
        EstudanteAvaliacao avaliacao = avaliacaoRepository.findById(avaliacaoId)
                .orElseThrow(() -> new ResourceNotFoundException("Avaliação não encontrada"));

        String uuidLogado = getUuidLogado();
        Estudante estudante = estudanteRepository.findByUuid(uuidLogado)
                .orElseThrow(() -> new ResourceNotFoundException("Estudante não encontrado"));

        EstudanteAvaliacaoComent comentario = new EstudanteAvaliacaoComent();
        comentario.setEstudante(estudante);
        comentario.setAvaliacao(avaliacao);
        comentario.setTexto(dto.texto());
        comentario.setAnonima(dto.anonima() != null ? dto.anonima() : false);

        comentarioRepository.save(comentario);
        return criarRespostaSucesso("Comentário criado com sucesso!");
    }

    @DeleteMapping("/comentarios-estudante/{id}")
    @PreAuthorize("hasRole('ESTUDANTE') or hasRole('ADMIN')")
    public ResponseEntity<?> deletarComentario(@PathVariable Long id) {
        String uuidLogado = getUuidLogado();
        
        EstudanteAvaliacaoComent comentario = comentarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comentário não encontrado"));

        if (!comentario.getEstudante().getUuid().equals(uuidLogado)) {
            throw new org.springframework.security.access.AccessDeniedException("Você não tem permissão para deletar este comentário");
        }

        comentarioRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/comentarios-estudante/{id}")
    @PreAuthorize("hasRole('ESTUDANTE') or hasRole('ADMIN')")
    public ResponseEntity<?> atualizarComentario(@PathVariable Long id, @RequestBody AvaliacaoComentDTO dto) {
        String uuidLogado = getUuidLogado();
        
        EstudanteAvaliacaoComent comentario = comentarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comentário não encontrado"));

        if (!comentario.getEstudante().getUuid().equals(uuidLogado)) {
            throw new org.springframework.security.access.AccessDeniedException("Você não tem permissão para editar este comentário");
        }

        comentario.setTexto(dto.texto());
        if (dto.anonima() != null) {
            comentario.setAnonima(dto.anonima());
        }
        comentarioRepository.save(comentario);
        return criarRespostaSucesso("Comentário atualizado com sucesso!");
    }

    @GetMapping("/{avaliacaoId}/comentarios-empresa")
    public ResponseEntity<List<EmpresaAvaliacaoComentResponseDTO>> listarComentariosEmpresa(@PathVariable Long avaliacaoId) {
        return ResponseEntity.ok(empresaComentarioRepository.findByAvaliacaoId(avaliacaoId)
                .stream()
                .map(this::toEmpresaComentResponseDTO)
                .toList());
    }

    @PostMapping("/{avaliacaoId}/comentarios-empresa")
    @PreAuthorize("hasRole('EMPRESA') or hasRole('ADMIN')")
    public ResponseEntity<?> criarComentarioEmpresa(@PathVariable Long avaliacaoId, @RequestBody AvaliacaoComentDTO dto) {
        EstudanteAvaliacao avaliacao = avaliacaoRepository.findById(avaliacaoId)
                .orElseThrow(() -> new ResourceNotFoundException("Avaliação não encontrada"));

        String uuidLogado = getUuidLogado();
        Empresa empresa = empresaRepository.findByUuid(uuidLogado)
                .orElseThrow(() -> new ResourceNotFoundException("Empresa não encontrada"));

        if (!avaliacao.getEmpresa().getId().equals(empresa.getId())) {
            throw new IllegalArgumentException("Você só pode comentar em avaliações da sua empresa");
        }

        EmpresaAvaliacaoComent comentario = new EmpresaAvaliacaoComent();
        comentario.setEmpresa(empresa);
        comentario.setAvaliacao(avaliacao);
        comentario.setTexto(dto.texto());

        empresaComentarioRepository.save(comentario);
        return criarRespostaSucesso("Comentário criado com sucesso!");
    }

    @DeleteMapping("/comentarios-empresa/{id}")
    @PreAuthorize("hasRole('EMPRESA') or hasRole('ADMIN')")
    public ResponseEntity<?> deletarComentarioEmpresa(@PathVariable Long id) {
        String uuidLogado = getUuidLogado();
        
        EmpresaAvaliacaoComent comentario = empresaComentarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comentário não encontrado"));

        if (!comentario.getEmpresa().getUuid().equals(uuidLogado)) {
            throw new org.springframework.security.access.AccessDeniedException("Você não tem permissão para deletar este comentário");
        }

        empresaComentarioRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/comentarios-empresa/{id}")
    @PreAuthorize("hasRole('EMPRESA') or hasRole('ADMIN')")
    public ResponseEntity<?> atualizarComentarioEmpresa(@PathVariable Long id, @RequestBody AvaliacaoComentDTO dto) {
        String uuidLogado = getUuidLogado();
        
        EmpresaAvaliacaoComent comentario = empresaComentarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comentário não encontrado"));

        if (!comentario.getEmpresa().getUuid().equals(uuidLogado)) {
            throw new org.springframework.security.access.AccessDeniedException("Você não tem permissão para editar este comentário");
        }

        comentario.setTexto(dto.texto());
        empresaComentarioRepository.save(comentario);
        return criarRespostaSucesso("Comentário atualizado com sucesso!");
    }

    private String getUuidLogado() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof UserDetails userDetails) {
            return userDetails.getUsername();
        }
        throw new IllegalStateException("Usuário não autenticado");
    }

    private AvaliacaoComentResponseDTO toComentResponseDTO(EstudanteAvaliacaoComent comentario) {
        Boolean anonima = comentario.getAnonima();

        Long estudanteId = anonima ? null : comentario.getEstudante().getId();
        String nomeEstudante = anonima ? null : comentario.getEstudante().getNome();
        String fotoUrlEstudante = anonima ? null : comentario.getEstudante().getFotoUrl();
        String userEstudante = anonima ? null : comentario.getEstudante().getUser();

        return new AvaliacaoComentResponseDTO(
                comentario.getId(),
                estudanteId,
                nomeEstudante,
                fotoUrlEstudante,
                userEstudante,
                comentario.getAvaliacao().getId(),
                comentario.getTexto(),
                comentario.getAnonima(),
                comentario.getNumRespostas(),
                comentario.getCreatedAt(),
                comentario.getUpdatedAt()
        );
    }

    private EmpresaAvaliacaoComentResponseDTO toEmpresaComentResponseDTO(EmpresaAvaliacaoComent comentario) {
        return new EmpresaAvaliacaoComentResponseDTO(
                comentario.getId(),
                comentario.getEmpresa().getId(),
                comentario.getEmpresa().getNomeFantasia(),
                comentario.getEmpresa().getFotoUrl(),
                comentario.getAvaliacao().getId(),
                comentario.getTexto(),
                comentario.getNumRespostas(),
                comentario.getCreatedAt(),
                comentario.getUpdatedAt()
        );
    }

    private ResponseEntity<?> criarRespostaSucesso(String mensagem) {
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("status", 200);
        response.put("message", mensagem);
        return ResponseEntity.ok(response);
    }
}