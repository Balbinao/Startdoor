package com.example.backend.service;

import com.example.backend.dto.CompetenciaPontuacaoDTO;
import com.example.backend.dto.PontosFortesFracosResponseDTO;
import com.example.backend.dto.RecomendacaoResponseDTO;
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

        validarDadosMatch(estudante, empresa, condi, media);
        List<CompetenciaPontuacaoDTO> listaGeral = gerarListaGeral(media, condi);

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


    public List<RecomendacaoResponseDTO> listarRecomendacoes(Long estudanteId) {
        Estudante estudante = estudanteRepository.findById(estudanteId)
                .orElseThrow(() -> new ResourceNotFoundException("Estudante não encontrado"));

        EstudanteNotaCondi condi = estudante.getNotaCondicional();
        if (condi == null || (condi.getAmbiente() == 0 && condi.getRemuneracao() == 0)) {
            throw new PreferenciaNaoDefinidaException("Configure suas preferências primeiro.");
        }

        List<Empresa> empresas = empresaRepository.findAll();

        return empresas.stream()
                .filter(e -> e.getEmpresaMedia() != null && e.getEmpresaMedia().getMediaGeral() != null
                        && e.getEmpresaMedia().getMediaGeral().compareTo(BigDecimal.ZERO) > 0)
                .map(empresa -> {
                    double afinidade = calcularPorcentagemAfinidade(condi, empresa.getEmpresaMedia());
                    return new RecomendacaoResponseDTO(
                            empresa.getId(),
                            empresa.getNomeFantasia(),
                            empresa.getFotoUrl(),
                            empresa.getBiografia(),
                            empresa.getEstadoSede(),
                            empresa.getPaisOrigem(),
                            empresa.getEmpresaMedia().getMediaGeral(),
                            (int) afinidade
                    );
                })
                .filter(dto -> dto.percentualMatch() >= 80)
                .sorted((a, b) -> b.percentualMatch().compareTo(a.percentualMatch()))
                .limit(5)
                .collect(Collectors.toList());
    }


    private void validarDadosMatch(Estudante est, Empresa emp, EstudanteNotaCondi condi, EmpresaMedia media) {
        if (condi == null || (condi.getAmbiente() == 0 && condi.getRemuneracao() == 0 && condi.getAprendizado() == 0)) {
            throw new PreferenciaNaoDefinidaException("O estudante " + est.getNome() + " precisa configurar suas notas condicionais.");
        }
        if (media == null || media.getMediaGeral() == null || media.getMediaGeral().compareTo(BigDecimal.ZERO) == 0) {
            throw new EmpresaSemAvaliacoesException("A empresa " + emp.getNomeFantasia() + " ainda não possui avaliações suficientes.");
        }
    }

    private List<CompetenciaPontuacaoDTO> gerarListaGeral(EmpresaMedia m, EstudanteNotaCondi c) {
        List<CompetenciaPontuacaoDTO> lista = new ArrayList<>();
        adicionarCategoria(lista, "Ambiente", m.getMediaAmbiente(), c.getAmbiente());
        adicionarCategoria(lista, "Aprendizado", m.getMediaAprendizado(), c.getAprendizado());
        adicionarCategoria(lista, "Benefícios", m.getMediaBeneficios(), c.getBeneficios());
        adicionarCategoria(lista, "Cultura", m.getMediaCultura(), c.getCultura());
        adicionarCategoria(lista, "Efetivação", m.getMediaEfetivacao(), c.getEfetivacao());
        adicionarCategoria(lista, "Entrevista", m.getMediaEntrevista(), c.getEntrevista());
        adicionarCategoria(lista, "Feedback", m.getMediaFeedback(), c.getFeedback());
        adicionarCategoria(lista, "Infraestrutura", m.getMediaInfraestrutura(), c.getInfraestrutura());
        adicionarCategoria(lista, "Integração", m.getMediaIntegracao(), c.getIntegracao());
        adicionarCategoria(lista, "Remuneração", m.getMediaRemuneracao(), c.getRemuneracao());
        adicionarCategoria(lista, "Rotina", m.getMediaRotina(), c.getRotina());
        adicionarCategoria(lista, "Liderança", m.getMediaLideranca(), c.getLideranca());
        return lista;
    }

    private void adicionarCategoria(List<CompetenciaPontuacaoDTO> lista, String nome, BigDecimal notaEmp, Integer notaEst) {
        if (notaEmp == null) notaEmp = BigDecimal.ZERO;
        if (notaEst == null) notaEst = 0;
        int percentual = notaEmp.multiply(BigDecimal.valueOf(20)).intValue();
        lista.add(new CompetenciaPontuacaoDTO(nome, percentual, notaEmp, notaEst));
    }

    private double calcularPorcentagemAfinidade(EstudanteNotaCondi condi, EmpresaMedia media) {
        double somaErrosPonderados = 0;
        double somaPesosMaximos = 0;

        double[][] categorias = {
                {(double) condi.getAmbiente(), media.getMediaAmbiente().doubleValue()},
                {(double) condi.getAprendizado(), media.getMediaAprendizado().doubleValue()},
                {(double) condi.getBeneficios(), media.getMediaBeneficios().doubleValue()},
                {(double) condi.getCultura(), media.getMediaCultura().doubleValue()},
                {(double) condi.getEfetivacao(), media.getMediaEfetivacao().doubleValue()},
                {(double) condi.getEntrevista(), media.getMediaEntrevista().doubleValue()},
                {(double) condi.getFeedback(), media.getMediaFeedback().doubleValue()},
                {(double) condi.getInfraestrutura(), media.getMediaInfraestrutura().doubleValue()},
                {(double) condi.getIntegracao(), media.getMediaIntegracao().doubleValue()},
                {(double) condi.getRemuneracao(), media.getMediaRemuneracao().doubleValue()},
                {(double) condi.getRotina(), media.getMediaRotina().doubleValue()},
                {(double) condi.getLideranca(), media.getMediaLideranca().doubleValue()}
        };

        for (double[] par : categorias) {
            double notaEstudante = par[0];
            double notaEmpresa = par[1];
            if (notaEstudante > 0) {
                double erro = Math.max(0, notaEstudante - notaEmpresa);
                somaErrosPonderados += (erro * notaEstudante);
                somaPesosMaximos += (4.0 * notaEstudante);
            }
        }

        if (somaPesosMaximos == 0) return 0;
        double afinidade = ((somaPesosMaximos - somaErrosPonderados) / somaPesosMaximos) * 100;
        return Math.max(0, afinidade);
    }
}