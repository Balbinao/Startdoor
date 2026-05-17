package com.example.backend.service;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Empresa;
import com.example.backend.model.EmpresaMedia;
import com.example.backend.model.EstudanteAvaliacao;
import com.example.backend.repository.EmpresaRepository;
import com.example.backend.repository.EstudanteAvaliacaoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.function.ToIntFunction;

@Service
public class MediaService {

    private final EstudanteAvaliacaoRepository avaliacaoRepository;
    private final EmpresaRepository empresaRepository;

    public MediaService(EstudanteAvaliacaoRepository avaliacaoRepository,
                        EmpresaRepository empresaRepository) {
        this.avaliacaoRepository = avaliacaoRepository;
        this.empresaRepository = empresaRepository;
    }

    @Transactional
    public void atualizarMediaEmpresa(Long empresaId) {
        Empresa empresa = empresaRepository.findById(empresaId)
                .orElseThrow(() -> new ResourceNotFoundException("Empresa não encontrada com o ID: " + empresaId));

        List<EstudanteAvaliacao> avaliacoes = avaliacaoRepository.findByEmpresaId(empresaId);
        EmpresaMedia media = empresa.getEmpresaMedia();
        if (media == null) {
            media = new EmpresaMedia();
            empresa.setEmpresaMedia(media);
        }

        if (avaliacoes.isEmpty()) {
            zerarMedias(media);
            media.setSalarioMinPiso(BigDecimal.ZERO);
            media.setSalarioMaxTeto(BigDecimal.ZERO);
            media.setSalarioBaseMedio(BigDecimal.ZERO);
        } else {
            media.setMediaAmbiente(calcular(avaliacoes, EstudanteAvaliacao::getAmbiente));
            media.setMediaAprendizado(calcular(avaliacoes, EstudanteAvaliacao::getAprendizado));
            media.setMediaBeneficios(calcular(avaliacoes, EstudanteAvaliacao::getBeneficios));
            media.setMediaCultura(calcular(avaliacoes, EstudanteAvaliacao::getCultura));
            media.setMediaEfetivacao(calcular(avaliacoes, EstudanteAvaliacao::getEfetivacao));
            media.setMediaEntrevista(calcular(avaliacoes, EstudanteAvaliacao::getEntrevista));
            media.setMediaFeedback(calcular(avaliacoes, EstudanteAvaliacao::getFeedback));
            media.setMediaInfraestrutura(calcular(avaliacoes, EstudanteAvaliacao::getInfraestrutura));
            media.setMediaIntegracao(calcular(avaliacoes, EstudanteAvaliacao::getIntegracao));
            media.setMediaRemuneracao(calcular(avaliacoes, EstudanteAvaliacao::getRemuneracao));
            media.setMediaRotina(calcular(avaliacoes, EstudanteAvaliacao::getRotina));
            media.setMediaLideranca(calcular(avaliacoes, EstudanteAvaliacao::getLideranca));

            media.setMediaGeral(calcularMediaGeral(media));

            List<EstudanteAvaliacao> avaliacoesValidas = avaliacoes.stream()
                    .filter(a -> a.getSalarioMin().compareTo(BigDecimal.valueOf(100)) > 0
                            && a.getSalarioMax().compareTo(BigDecimal.valueOf(25000)) < 0)
                    .toList();

            List<EstudanteAvaliacao> massaDeCalculo = avaliacoesValidas.isEmpty() ? avaliacoes : avaliacoesValidas;

            List<Double> salariosMediosOrdenados = massaDeCalculo.stream()
                    .map(a -> (a.getSalarioMin().doubleValue() + a.getSalarioMax().doubleValue()) / 2.0)
                    .sorted()
                    .toList();

            List<Double> salariosMinOrdenados = massaDeCalculo.stream()
                    .map(a -> a.getSalarioMin().doubleValue())
                    .sorted()
                    .toList();

            List<Double> salariosMaxOrdenados = massaDeCalculo.stream()
                    .map(a -> a.getSalarioMax().doubleValue())
                    .sorted()
                    .toList();

            double pisoFaixa = calcularPercentil(salariosMinOrdenados, 0.25);
            double tetoFaixa = calcularPercentil(salariosMaxOrdenados, 0.75);
            double salarioMedio = calcularPercentil(salariosMediosOrdenados, 0.50);

            media.setSalarioMinPiso(BigDecimal.valueOf(pisoFaixa).setScale(2, RoundingMode.HALF_UP));
            media.setSalarioMaxTeto(BigDecimal.valueOf(tetoFaixa).setScale(2, RoundingMode.HALF_UP));
            media.setSalarioBaseMedio(BigDecimal.valueOf(salarioMedio).setScale(2, RoundingMode.HALF_UP));
        }

        empresaRepository.save(empresa);
    }

    private double calcularPercentil(List<Double> valoresOrdenados, double percentil) {
        int n = valoresOrdenados.size();
        if (n == 1) return valoresOrdenados.get(0);

        double indice = percentil * (n - 1);
        int indiceBaixo = (int) Math.floor(indice);
        int indiceAlto = (int) Math.ceil(indice);

        if (indiceBaixo == indiceAlto) {
            return valoresOrdenados.get(indiceBaixo);
        }
        double peso = indice - indiceBaixo;
        return valoresOrdenados.get(indiceBaixo) * (1 - peso) + valoresOrdenados.get(indiceAlto) * peso;
    }

    private BigDecimal calcular(List<EstudanteAvaliacao> avaliacoes, ToIntFunction<EstudanteAvaliacao> getter) {
        double avg = avaliacoes.stream().mapToInt(getter).average().orElse(0.0);
        return BigDecimal.valueOf(avg).setScale(2, RoundingMode.HALF_UP);
    }

    private BigDecimal calcularMediaGeral(EmpresaMedia m) {
        BigDecimal soma = m.getMediaAmbiente().add(m.getMediaAprendizado()).add(m.getMediaBeneficios())
                .add(m.getMediaCultura()).add(m.getMediaEfetivacao()).add(m.getMediaEntrevista())
                .add(m.getMediaFeedback()).add(m.getMediaInfraestrutura()).add(m.getMediaIntegracao())
                .add(m.getMediaRemuneracao()).add(m.getMediaRotina()).add(m.getMediaLideranca());

        return soma.divide(BigDecimal.valueOf(12), 2, RoundingMode.HALF_UP);
    }

    private void zerarMedias(EmpresaMedia m) {
        BigDecimal zero = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        m.setMediaAmbiente(zero); m.setMediaAprendizado(zero); m.setMediaBeneficios(zero);
        m.setMediaCultura(zero); m.setMediaEfetivacao(zero); m.setMediaEntrevista(zero);
        m.setMediaFeedback(zero); m.setMediaInfraestrutura(zero); m.setMediaIntegracao(zero);
        m.setMediaRemuneracao(zero); m.setMediaRotina(zero); m.setMediaLideranca(zero);
        m.setMediaGeral(zero);
    }
}