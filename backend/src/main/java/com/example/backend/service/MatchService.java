package com.example.backend.service;

import com.example.backend.dto.CompetenciaPontuacaoDTO;
import com.example.backend.dto.PontosFortesFracosResponseDTO;
import com.example.backend.exception.EmpresaSemAvaliacoesException;
import com.example.backend.exception.PreferenciaNaoDefinidaException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Empresa;
import com.example.backend.model.EmpresaMedia;
import com.example.backend.model.Estudante;
import com.example.backend.model.EstudanteNotaCondi;
import com.example.backend.repository.EmpresaRepository;
import com.example.backend.repository.EstudanteRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MatchService {

    private final EstudanteRepository estudanteRepository;
    private final EmpresaRepository empresaRepository;

    public MatchService(EstudanteRepository estudanteRepository, EmpresaRepository empresaRepository) {
        this.estudanteRepository = estudanteRepository;
        this.empresaRepository = empresaRepository;
    }

    public PontosFortesFracosResponseDTO calcularPontosFortesFracos(Long estudanteId, Long empresaId) {
        Estudante estudante = estudanteRepository.findById(estudanteId)
                .orElseThrow(() -> new ResourceNotFoundException("Estudante não encontrado"));

        Empresa empresa = empresaRepository.findById(empresaId)
                .orElseThrow(() -> new ResourceNotFoundException("Empresa não encontrada"));

        EstudanteNotaCondi condi = estudante.getNotaCondicional();
        EmpresaMedia media = empresa.getEmpresaMedia();

        if (condi == null || (condi.getAmbiente() == 0 && condi.getRemuneracao() == 0 && condi.getAprendizado() == 0)) {
            throw new PreferenciaNaoDefinidaException(
                    "Você precisa configurar seus pesos de preferência (notas condicionais)."
            );
        }
        if (media == null || media.getMediaGeral() == null || media.getMediaGeral().compareTo(BigDecimal.ZERO) == 0) {
            throw new EmpresaSemAvaliacoesException(
                    "A empresa " + empresa.getNomeFantasia() + " ainda não possui avaliações suficientes para calcular o match."
            );
        }

        List<CompetenciaPontuacaoDTO> listaGeral = new ArrayList<>();

        adicionarCategoria(listaGeral, "Ambiente", media.getMediaAmbiente(), condi.getAmbiente());
        adicionarCategoria(listaGeral, "Aprendizado", media.getMediaAprendizado(), condi.getAprendizado());
        adicionarCategoria(listaGeral, "Benefícios", media.getMediaBeneficios(), condi.getBeneficios());
        adicionarCategoria(listaGeral, "Cultura", media.getMediaCultura(), condi.getCultura());
        adicionarCategoria(listaGeral, "Efetivação", media.getMediaEfetivacao(), condi.getEfetivacao());
        adicionarCategoria(listaGeral, "Entrevista", media.getMediaEntrevista(), condi.getEntrevista());
        adicionarCategoria(listaGeral, "Feedback", media.getMediaFeedback(), condi.getFeedback());
        adicionarCategoria(listaGeral, "Infraestrutura", media.getMediaInfraestrutura(), condi.getInfraestrutura());
        adicionarCategoria(listaGeral, "Integração", media.getMediaIntegracao(), condi.getIntegracao());
        adicionarCategoria(listaGeral, "Remuneração", media.getMediaRemuneracao(), condi.getRemuneracao());
        adicionarCategoria(listaGeral, "Rotina", media.getMediaRotina(), condi.getRotina());
        adicionarCategoria(listaGeral, "Liderança", media.getMediaLideranca(), condi.getLideranca());

        List<CompetenciaPontuacaoDTO> fortes = listaGeral.stream()
                .filter(c -> c.notaEmpresa().doubleValue() > 3.75)
                .sorted((a, b) -> {
                    BigDecimal scoreA = a.notaEmpresa().multiply(BigDecimal.valueOf(a.notaEstudante()));
                    BigDecimal scoreB = b.notaEmpresa().multiply(BigDecimal.valueOf(b.notaEstudante()));
                    return scoreB.compareTo(scoreA);
                })
                .limit(3)
                .collect(Collectors.toList());

        List<CompetenciaPontuacaoDTO> fracos = listaGeral.stream()
                .filter(c -> c.notaEmpresa().doubleValue() <= 3.75 && c.notaEmpresa().doubleValue() < c.notaEstudante())
                .sorted((a, b) -> {
                    BigDecimal gapA = BigDecimal.valueOf(a.notaEstudante()).subtract(a.notaEmpresa());
                    BigDecimal gapB = BigDecimal.valueOf(b.notaEstudante()).subtract(b.notaEmpresa());
                    return gapB.compareTo(gapA);
                })
                .limit(3)
                .collect(Collectors.toList());

        return new PontosFortesFracosResponseDTO(fortes, fracos);
    }

    private void adicionarCategoria(List<CompetenciaPontuacaoDTO> lista, String nome, BigDecimal notaEmp, Integer notaEst) {
        if (notaEmp == null) notaEmp = BigDecimal.ZERO;
        if (notaEst == null) notaEst = 0;

        int percentual = notaEmp.multiply(BigDecimal.valueOf(20)).intValue();
        lista.add(new CompetenciaPontuacaoDTO(nome, percentual, notaEmp, notaEst));
    }
}