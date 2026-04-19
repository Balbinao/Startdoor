package com.example.backend.service;

import com.example.backend.dto.AlterarSenhaDTO;
import com.example.backend.dto.AtualizarEstudanteDTO;
import com.example.backend.dto.CadastroEstudanteDTO;
import com.example.backend.dto.EstudanteResponseDTO;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Estudante;
import com.example.backend.model.EstudanteNotaCondi;
import com.example.backend.repository.AdminRepository;
import com.example.backend.repository.EmpresaRepository;
import com.example.backend.repository.EstudanteNotaCondiRepository;
import com.example.backend.repository.EstudanteRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Service
public class EstudanteService {

    private final EstudanteRepository estudanteRepository;
    private final EstudanteNotaCondiRepository notaCondiRepository;
    private final EmpresaRepository empresaRepository;
    private final AdminRepository adminRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final FotoStorageService fotoStorageService;

    public EstudanteService(EstudanteRepository estudanteRepository, EstudanteNotaCondiRepository notaCondiRepository, BCryptPasswordEncoder bCryptPasswordEncoder, EmpresaRepository empresaRepository, AdminRepository adminRepository, FotoStorageService fotoStorageService) {
        this.estudanteRepository = estudanteRepository;
        this.notaCondiRepository = notaCondiRepository;
        this.empresaRepository = empresaRepository;
        this.adminRepository = adminRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.fotoStorageService = fotoStorageService;
    }

    public void cadastrar(CadastroEstudanteDTO data) {
        if (emailJaExiste(data.email())) throw new RuntimeException("E-mail já cadastrado no sistema");
        if (estudanteRepository.existsByCpf(data.cpf())) throw new RuntimeException("CPF já cadastrado");
        if (estudanteRepository.existsByUser(data.user())) throw new RuntimeException("Username já em uso");

        Estudante estudante = new Estudante();
        estudante.setNome(data.nome());
        estudante.setCpf(data.cpf());
        estudante.setUser(data.user());
        estudante.setEmail(data.email());
        estudante.setSenha(bCryptPasswordEncoder.encode(data.senha()));

        estudante = estudanteRepository.save(estudante);

        EstudanteNotaCondi notaCondi = new EstudanteNotaCondi();
        notaCondi.setEstudante(estudante);
        notaCondi.setAmbiente(0);
        notaCondi.setAprendizado(0);
        notaCondi.setBeneficios(0);
        notaCondi.setCultura(0);
        notaCondi.setEfetivacao(0);
        notaCondi.setEntrevista(0);
        notaCondi.setFeedback(0);
        notaCondi.setInfraestrutura(0);
        notaCondi.setIntegracao(0);
        notaCondi.setRemuneracao(0);
        notaCondi.setRotina(0);
        notaCondi.setLideranca(0);
        notaCondiRepository.save(notaCondi);
    }

    private boolean emailJaExiste(String email) {
        return estudanteRepository.existsByEmail(email) ||
                empresaRepository.existsByEmail(email) ||
                adminRepository.existsByEmail(email);
    }

    @Transactional(readOnly = true)
    public List<EstudanteResponseDTO> listarTodos(){
        List<Estudante> estudantes = estudanteRepository.findAll();

        return estudantes.stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public EstudanteResponseDTO buscarPorId(Long id){
        Estudante estudante =  estudanteRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Estudante não encontrado com o ID: " + id));
        return toResponseDTO(estudante);
    }

    public void atualizar(Long id, AtualizarEstudanteDTO dto) {
        Estudante estudante = estudanteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Estudante não encontrado."));

        if (dto.nome() != null) estudante.setNome(dto.nome());
        if (dto.user() != null && !dto.user().equals(estudante.getUser())) {
            if (estudanteRepository.existsByUser(dto.user())) {
                throw new RuntimeException("Este nome de usuário já está em uso.");
            }
            estudante.setUser(dto.user());
        }
        if (dto.email() != null && !dto.email().equals(estudante.getEmail())) {
            if (emailJaExiste(dto.email())) {
                throw new RuntimeException("Este e-mail já está em uso por outro usuário.");
            }
            estudante.setEmail(dto.email());
        }
        if (dto.biografia() != null)          estudante.setBiografia(dto.biografia());
        if (dto.paisOrigem() != null)         estudante.setPaisOrigem(dto.paisOrigem());
        if (dto.dataNascimento() != null) {
            if (dto.dataNascimento().isBlank()) {
                estudante.setDataNascimento(null);
            } else {
                estudante.setDataNascimento(LocalDate.parse(dto.dataNascimento()));
            }
        }
        if (dto.modeloTrabalho() != null)     estudante.setModeloTrabalho(dto.modeloTrabalho());
        if (dto.estadoAtuacao() != null)      estudante.setEstadoAtuacao(dto.estadoAtuacao());
        if (dto.setorInteresse() != null)     estudante.setSetorInteresse(dto.setorInteresse());
        if (dto.habilidadesPrincipais() != null) estudante.setHabilidadesPrincipais(dto.habilidadesPrincipais());
        if (dto.linkSite() != null)           estudante.setLinkSite(dto.linkSite());
        if (dto.linkLinkedin() != null)       estudante.setLinkLinkedin(dto.linkLinkedin());

        estudanteRepository.save(estudante);
    }

    @Transactional
    public void deletar(Long id) {
        Estudante estudante = estudanteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Estudante não encontrado"));

        if (estudante.getFotoUrl() != null) {
            fotoStorageService.excluir(estudante.getFotoUrl());
        }
        estudanteRepository.delete(estudante);
    }


    public void alterarSenha(Long id, AlterarSenhaDTO dto) {
        Estudante estudante = estudanteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Estudante não encontrado"));

//        if (!bCryptPasswordEncoder.matches(dto.senhaAtual(), estudante.getSenha())) {
//            throw new RuntimeException("Senha atual incorreta!");
//        }

        estudante.setSenha(bCryptPasswordEncoder.encode(dto.novaSenha()));
        estudanteRepository.save(estudante);
    }


    @Transactional
    public EstudanteResponseDTO atualizarFoto(Long id, MultipartFile arquivo) {
        Estudante estudante = estudanteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Estudante não encontrado"));

        if (estudante.getFotoUrl() != null) {
            fotoStorageService.excluir(estudante.getFotoUrl());
        }
        String nomeFoto = fotoStorageService.salvar(arquivo);

        estudante.setFotoUrl(nomeFoto);
        return toResponseDTO(estudanteRepository.save(estudante));
    }

    @Transactional
    public void removerFoto(Long id) {
        Estudante estudante = estudanteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Estudante não encontrado"));

        if (estudante.getFotoUrl() != null) {
            fotoStorageService.excluir(estudante.getFotoUrl());
            estudante.setFotoUrl(null);
            estudanteRepository.save(estudante);
        }
    }


    private EstudanteResponseDTO toResponseDTO(Estudante estudante) {
        String urlCompleta = (estudante.getFotoUrl() != null)
                ? "http://localhost:8080/fotos/" + estudante.getFotoUrl()
                : null;

        return new EstudanteResponseDTO(
                estudante.getId(),
                estudante.getNome(),
                estudante.getCpf(),
                estudante.getUser(),
                estudante.getEmail(),
                urlCompleta,
                estudante.getBiografia(),
                estudante.getPaisOrigem(),
                estudante.getDataNascimento(),
                estudante.getModeloTrabalho(),
                estudante.getEstadoAtuacao(),
                estudante.getSetorInteresse(),
                estudante.getHabilidadesPrincipais(),
                estudante.getLinkSite(),
                estudante.getLinkLinkedin(),
                estudante.getCreatedAt()
        );
    }
}
