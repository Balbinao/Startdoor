package com.example.backend.service;

import com.example.backend.dto.AlterarSenhaDTO;
import com.example.backend.dto.AtualizarEmpresaDTO;
import com.example.backend.dto.CadastroEmpresaDTO;
import com.example.backend.dto.EmpresaResponseDTO;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Empresa;
import com.example.backend.model.Estudante;
import com.example.backend.repository.AdminRepository;
import com.example.backend.repository.EmpresaRepository;
import com.example.backend.repository.EstudanteRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Service
public class EmpresaService {

    private final EmpresaRepository empresaRepository;
    private final EstudanteRepository estudanteRepository;
    private final AdminRepository adminRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final FotoStorageService fotoStorageService;

    public EmpresaService(EmpresaRepository repository, EstudanteRepository estudanteRepository, AdminRepository adminRepository, BCryptPasswordEncoder bCryptPasswordEncoder, FotoStorageService fotoStorageService) {
        this.empresaRepository = repository;
        this.estudanteRepository = estudanteRepository;
        this.adminRepository = adminRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.fotoStorageService = fotoStorageService;
    }

    public void cadastrar(CadastroEmpresaDTO data) {

        if (emailJaExiste(data.email())) {
            throw new RuntimeException("E-mail corporativo já cadastrado no sistema");
        }

        if (empresaRepository.existsByCnpj(data.cnpj())) {
            throw new RuntimeException("CNPJ já cadastrado");
        }

        Empresa novaEmpresa = new Empresa();
        novaEmpresa.setNomeFantasia(data.nomeFantasia());
        novaEmpresa.setCnpj(data.cnpj());
        novaEmpresa.setEmail(data.email());
        novaEmpresa.setUser(data.email());
        novaEmpresa.setSenha(bCryptPasswordEncoder.encode(data.senha()));

        empresaRepository.save(novaEmpresa);
    }

    private boolean emailJaExiste(String email) {
        return estudanteRepository.existsByEmail(email) ||
                empresaRepository.existsByEmail(email) ||
                adminRepository.existsByEmail(email);
    }

    @Transactional(readOnly = true)
    public List<EmpresaResponseDTO> listarTodas() {
        List<Empresa> empresas = empresaRepository.findAll();

        return empresas.stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public EmpresaResponseDTO buscarPorId(Long id) {
        Empresa empresa = empresaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Empresa não encontrada com o ID: " + id));
        return toResponseDTO(empresa);
    }

    private EmpresaResponseDTO toResponseDTO(Empresa empresa) {
        String urlCompleta = (empresa.getFotoUrl() != null)
                ? "http://localhost:8080/fotos/" + empresa.getFotoUrl()
                : null;

        return new EmpresaResponseDTO(
                empresa.getId(),
                urlCompleta,
                empresa.getNomeFantasia(),
                empresa.getCnpj(),
                empresa.getEmail(),
                empresa.getMediaNotaGeral(),
                empresa.getBiografia(),
                empresa.getPaisOrigem(),
                empresa.getReceitaAnual(),
                empresa.getDataFundacao(),
                empresa.getTamanhoEmpresa(),
                empresa.getEstadoSede(),
                empresa.getMediaSalarial(),
                empresa.getAreaAtuacao(),
                empresa.getLinkSite(),
                empresa.getLinkLinkedin(),
                empresa.getLinkGupy(),
                empresa.getCreatedAt()
        );
    }

    public EmpresaResponseDTO atualizar(Long id, AtualizarEmpresaDTO dto) {
        Empresa empresa = empresaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Empresa não encontrada."));

        if (dto.nomeFantasia() != null) empresa.setNomeFantasia(dto.nomeFantasia());
        if (dto.email() != null && !dto.email().equals(empresa.getEmail())) {
            if (emailJaExiste(dto.email())) {
                throw new RuntimeException("Este e-mail já está em uso por outro no sistema.");
            }
            empresa.setEmail(dto.email());
        }
        if (dto.biografia() != null)    empresa.setBiografia(dto.biografia());
        if (dto.paisOrigem() != null)   empresa.setPaisOrigem(dto.paisOrigem());
        if (dto.estadoSede() != null)    empresa.setEstadoSede(dto.estadoSede());
        if (dto.areaAtuacao() != null)  empresa.setAreaAtuacao(dto.areaAtuacao());
        if (dto.mediaSalarial() != null) empresa.setMediaSalarial(dto.mediaSalarial());
        if (dto.receitaAnual() != null)   empresa.setReceitaAnual(dto.receitaAnual());
        if (dto.tamanhoEmpresa() != null) empresa.setTamanhoEmpresa(dto.tamanhoEmpresa());
        if (dto.dataFundacao() != null) {
            if (dto.dataFundacao().isBlank()) {
                empresa.setDataFundacao(null);
            } else {
                empresa.setDataFundacao(LocalDate.parse(dto.dataFundacao()));
            }
        }
        if (dto.linkSite() != null)      empresa.setLinkSite(dto.linkSite());
        if (dto.linkLinkedin() != null)  empresa.setLinkLinkedin(dto.linkLinkedin());
        if (dto.linkGupy() != null)      empresa.setLinkGupy(dto.linkGupy());

        Empresa empresaSalva = empresaRepository.save(empresa);
        return toResponseDTO(empresaSalva);
    }

    @Transactional
    public void deletar(Long id) {
        Empresa empresa = empresaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Empresa não encontrada."));
        empresaRepository.delete(empresa);
    }

    public void alterarSenha(Long id, AlterarSenhaDTO dto) {
        Empresa empresa = empresaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Empresa não encontrada"));

//        if (!bCryptPasswordEncoder.matches(dto.senhaAtual(), empresa.getSenha())) {
//            throw new RuntimeException("Senha atual incorreta!");
//        }

        empresa.setSenha(bCryptPasswordEncoder.encode(dto.novaSenha()));
        empresaRepository.save(empresa);
    }

    public EmpresaResponseDTO atualizarFoto(Long id, MultipartFile arquivo) {
        Empresa empresa = empresaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada"));

        if (empresa.getFotoUrl() != null) {
            fotoStorageService.excluir(empresa.getFotoUrl());
        }

        String nomeArquivo = fotoStorageService.salvar(arquivo);
        empresa.setFotoUrl(nomeArquivo);
        empresaRepository.save(empresa);

        return toResponseDTO(empresa);
    }

    public void removerFoto(Long id) {
        Empresa empresa = empresaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada"));

        if (empresa.getFotoUrl() != null) {
            fotoStorageService.excluir(empresa.getFotoUrl());
            empresa.setFotoUrl(null);
            empresaRepository.save(empresa);
        }
    }
}
