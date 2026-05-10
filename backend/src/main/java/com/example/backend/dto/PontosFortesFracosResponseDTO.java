package com.example.backend.dto;

import java.util.List;

public record PontosFortesFracosResponseDTO(
        List<CompetenciaPontuacaoDTO> pontosFortes,
        List<CompetenciaPontuacaoDTO> pontosFracos
) {
}
