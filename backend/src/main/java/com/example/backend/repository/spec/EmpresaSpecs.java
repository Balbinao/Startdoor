package com.example.backend.repository.spec;

import com.example.backend.model.Empresa;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class EmpresaSpecs {
    public static Specification<Empresa> filtrar(
            BigDecimal notaGeral,
            String receitaAnual,
            String tamanhoEmpresa, Integer ambiente, Integer aprendizado, Integer beneficios,
            Integer cultura, Integer efetivacao, Integer entrevista,
            Integer feedback, Integer infra, Integer integracao,
            Integer remuneracao, Integer rotina, Integer lideranca) {

        return (root, query, builder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (receitaAnual != null && !receitaAnual.isBlank()) {
                predicates.add(builder.equal(root.get("receitaAnual"), receitaAnual));
            }
            if (tamanhoEmpresa != null && !tamanhoEmpresa.isBlank()) {
                predicates.add(builder.equal(root.get("tamanhoEmpresa"), tamanhoEmpresa));
            }

            var mediaJoin = root.get("empresaMedia");

            if (notaGeral != null) predicates.add(builder.greaterThanOrEqualTo(mediaJoin.get("mediaGeral"), notaGeral));
            if (ambiente != null) predicates.add(builder.greaterThanOrEqualTo(mediaJoin.get("mediaAmbiente"), ambiente));
            if (aprendizado != null) predicates.add(builder.greaterThanOrEqualTo(mediaJoin.get("mediaAprendizado"), aprendizado));
            if (beneficios != null) predicates.add(builder.greaterThanOrEqualTo(mediaJoin.get("mediaBeneficios"), beneficios));
            if (cultura != null) predicates.add(builder.greaterThanOrEqualTo(mediaJoin.get("mediaCultura"), cultura));
            if (efetivacao != null) predicates.add(builder.greaterThanOrEqualTo(mediaJoin.get("mediaEfetivacao"), efetivacao));
            if (entrevista != null) predicates.add(builder.greaterThanOrEqualTo(mediaJoin.get("mediaEntrevista"), entrevista));
            if (feedback != null) predicates.add(builder.greaterThanOrEqualTo(mediaJoin.get("mediaFeedback"), feedback));
            if (infra != null) predicates.add(builder.greaterThanOrEqualTo(mediaJoin.get("mediaInfraestrutura"), infra));
            if (integracao != null) predicates.add(builder.greaterThanOrEqualTo(mediaJoin.get("mediaIntegracao"), integracao));
            if (remuneracao != null) predicates.add(builder.greaterThanOrEqualTo(mediaJoin.get("mediaRemuneracao"), remuneracao));
            if (rotina != null) predicates.add(builder.greaterThanOrEqualTo(mediaJoin.get("mediaRotina"), rotina));
            if (lideranca != null) predicates.add(builder.greaterThanOrEqualTo(mediaJoin.get("mediaLideranca"), lideranca));

            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
