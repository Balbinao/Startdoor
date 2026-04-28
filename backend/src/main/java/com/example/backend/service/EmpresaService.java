package com.example.backend.service;

import com.example.backend.dto.*;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Empresa;
import com.example.backend.model.EmpresaMedia;
import com.example.backend.model.Estudante;
import com.example.backend.repository.AdminRepository;
import com.example.backend.repository.EmpresaRepository;
import com.example.backend.repository.EstudanteRepository;
import com.example.backend.repository.spec.EmpresaSpecs;
import org.apache.commons.text.similarity.LevenshteinDistance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
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

        EmpresaMedia mediaInicial = new EmpresaMedia();
        mediaInicial.setMediaGeral(BigDecimal.ZERO);
        mediaInicial.setMediaAmbiente(BigDecimal.ZERO);
        mediaInicial.setMediaAprendizado(BigDecimal.ZERO);
        mediaInicial.setMediaBeneficios(BigDecimal.ZERO);
        mediaInicial.setMediaCultura(BigDecimal.ZERO);
        mediaInicial.setMediaEfetivacao(BigDecimal.ZERO);
        mediaInicial.setMediaEntrevista(BigDecimal.ZERO);
        mediaInicial.setMediaFeedback(BigDecimal.ZERO);
        mediaInicial.setMediaInfraestrutura(BigDecimal.ZERO);
        mediaInicial.setMediaIntegracao(BigDecimal.ZERO);
        mediaInicial.setMediaRemuneracao(BigDecimal.ZERO);
        mediaInicial.setMediaRotina(BigDecimal.ZERO);
        mediaInicial.setMediaLideranca(BigDecimal.ZERO);

        novaEmpresa.setEmpresaMedia(mediaInicial);
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
        SalarioResumoDTO salarioDto = null;
        EmpresaMediaResponseDTO mediasDto = null;

        if (empresa.getEmpresaMedia() != null) {
            var m = empresa.getEmpresaMedia();
            mediasDto = new EmpresaMediaResponseDTO(
                    m.getMediaGeral(),
                    m.getMediaAmbiente(),
                    m.getMediaAprendizado(),
                    m.getMediaBeneficios(),
                    m.getMediaCultura(),
                    m.getMediaEfetivacao(),
                    m.getMediaEntrevista(),
                    m.getMediaFeedback(),
                    m.getMediaInfraestrutura(),
                    m.getMediaIntegracao(),
                    m.getMediaRemuneracao(),
                    m.getMediaRotina(),
                    m.getMediaLideranca()
            );
            salarioDto = new SalarioResumoDTO(
                    m.getSalarioMinPiso(),
                    m.getSalarioMaxTeto(),
                    m.getSalarioBaseMedio()
            );
        }

        return new EmpresaResponseDTO(
                empresa.getId(),
                urlCompleta,
                empresa.getNomeFantasia(),
                empresa.getCnpj(),
                empresa.getEmail(),
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
                empresa.getCreatedAt(),
                mediasDto,
                salarioDto

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
                .orElseThrow(() -> new ResourceNotFoundException("Empresa não encontrada"));

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
                .orElseThrow(() -> new ResourceNotFoundException("Empresa não encontrada"));

        if (empresa.getFotoUrl() != null) {
            fotoStorageService.excluir(empresa.getFotoUrl());
            empresa.setFotoUrl(null);
            empresaRepository.save(empresa);
        }
    }

    private EmpresaResumoDTO toResumoDTO(Empresa empresa) {
        String urlCompleta = (empresa.getFotoUrl() != null)
                ? "http://localhost:8080/fotos/" + empresa.getFotoUrl()
                : null;

        BigDecimal notaGeral = BigDecimal.ZERO;
        if (empresa.getEmpresaMedia() != null) {
            notaGeral = empresa.getEmpresaMedia().getMediaGeral();
        }

        return new EmpresaResumoDTO(
                empresa.getId(),
                empresa.getUuid(),
                empresa.getNomeFantasia(),
                empresa.getPaisOrigem(),
                empresa.getEstadoSede(),
                urlCompleta,
                empresa.getBiografia(),
                empresa.getAreaAtuacao(),
                empresa.getTamanhoEmpresa(),
                notaGeral
        );
    }

    public Page<EmpresaResumoDTO> pesquisar(
            String nome, BigDecimal nota, String receita, String tamanho,
            Integer ambiente, Integer aprendizado, Integer beneficios,
            Integer cultura, Integer efetivacao, Integer entrevista,
            Integer feedback, Integer infra, Integer integracao,
            Integer remuneracao, Integer rotina, Integer lideranca, Pageable pageable) {
        if (nome == null || nome.isBlank()) {
            return empresaRepository.findAll(
                    EmpresaSpecs.filtrar(null, nota, receita, tamanho, ambiente, aprendizado, beneficios,
                            cultura, efetivacao, entrevista, feedback, infra, integracao,
                            remuneracao, rotina, lideranca),
                    pageable
            ).map(this::toResumoDTO);
        }

        List<Empresa> filtradasPeloBanco = empresaRepository.findAll(
                EmpresaSpecs.filtrar(null, nota, receita, tamanho,
                        ambiente, aprendizado, beneficios,
                        cultura, efetivacao, entrevista,
                        feedback, infra, integracao,
                        remuneracao, rotina, lideranca)
        );
        LevenshteinDistance distance = new LevenshteinDistance();
        String buscaUsuario = nome.toLowerCase().trim();

        List<EmpresaResumoDTO> resultadoFuzzy = filtradasPeloBanco.stream()
                .filter(e -> {
                    if (e.getNomeFantasia() == null) return false;
                    String nomeBanco = e.getNomeFantasia().toLowerCase().trim();

                    if (nomeBanco.contains(buscaUsuario)) return true;

                    String[] palavrasNome = nomeBanco.split("\\s+");
                    for (String palavra : palavrasNome) {
                        if (palavra.length() < 2) continue;

                        if (distance.apply(palavra, buscaUsuario) <= 2) {
                            return true;
                        }
                    }
                    return false;
                })
                .map(this::toResumoDTO)
                .toList();

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), resultadoFuzzy.size());

        if (start > resultadoFuzzy.size()) {
            return new PageImpl<>(List.of(), pageable, resultadoFuzzy.size());
        }

        List<EmpresaResumoDTO> paginaSubList = resultadoFuzzy.subList(start, end);
        return new PageImpl<>(paginaSubList, pageable, resultadoFuzzy.size());
    }

}
