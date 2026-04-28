package com.example.backend.service;

import com.example.backend.dto.EmpresaResumoDTO;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Empresa;
import com.example.backend.model.Estudante;
import com.example.backend.repository.EmpresaRepository;
import com.example.backend.repository.EstudanteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoritoService {

    private final EstudanteRepository estudanteRepository;
    private final EmpresaRepository empresaRepository;

    public FavoritoService(EstudanteRepository estudanteRepository, EmpresaRepository empresaRepository) {
        this.estudanteRepository = estudanteRepository;
        this.empresaRepository = empresaRepository;
    }

    @Transactional
    public boolean alternarFavorito(Long estudanteId, Long empresaId) {
        Estudante estudante = estudanteRepository.findById(estudanteId)
                .orElseThrow(() -> new ResourceNotFoundException("Estudante não encontrado"));

        Empresa empresa = empresaRepository.findById(empresaId)
                .orElseThrow(() -> new ResourceNotFoundException("Empresa não encontrada"));

        boolean agoraEFavorito;
        if (estudante.getEmpresasFavoritas().contains(empresa)) {
            estudante.getEmpresasFavoritas().remove(empresa);
            agoraEFavorito = false;
        } else {
            estudante.getEmpresasFavoritas().add(empresa);
            agoraEFavorito = true;
        }

        estudanteRepository.save(estudante);
        return agoraEFavorito;
    }

    @Transactional(readOnly = true)
    public List<EmpresaResumoDTO> listarFavoritos(Long estudanteId) {
        Estudante estudante = estudanteRepository.findById(estudanteId)
                .orElseThrow(() -> new ResourceNotFoundException("Estudante não encontrado"));

        return estudante.getEmpresasFavoritas().stream()
                .map(this::toResumoDTO)
                .collect(Collectors.toList());
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
}