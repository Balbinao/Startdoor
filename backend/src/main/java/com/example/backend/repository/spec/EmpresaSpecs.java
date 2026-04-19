package com.example.backend.repository.spec;

import com.example.backend.model.Empresa;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.ArrayList;

public class EmpresaSpecs {
    public static Specification<Empresa> filtrar(
            BigDecimal notaMinima,
            String receitaAnual,
            String tamanhoEmpresa) {

        return (root, query, builder) -> {
            var predicates = new ArrayList<Predicate>();

            if (notaMinima != null) {
                predicates.add(builder.greaterThanOrEqualTo(root.get("mediaNotaGeral"), notaMinima));
            }

            if (receitaAnual != null && !receitaAnual.isBlank()) {
                predicates.add(builder.equal(root.get("receitaAnual"), receitaAnual));
            }

            if (tamanhoEmpresa != null && !tamanhoEmpresa.isBlank()) {
                predicates.add(builder.equal(root.get("tamanhoEmpresa"), tamanhoEmpresa));
            }

            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
