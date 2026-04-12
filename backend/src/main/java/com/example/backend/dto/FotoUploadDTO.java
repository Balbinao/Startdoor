package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.web.multipart.MultipartFile;

public record FotoUploadDTO(
        @Schema(type = "string", format = "binary", description = "Arquivo de imagem (JPG ou PNG)")
        MultipartFile arquivo
) {}
