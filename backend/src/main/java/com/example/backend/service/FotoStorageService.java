package com.example.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FotoStorageService {

    private final Path raiz = Paths.get("/app/fotos");

    public String salvar(MultipartFile arquivo) {
        try {
            String nomeArquivo = UUID.randomUUID().toString() + "_" + arquivo.getOriginalFilename();
            Files.copy(arquivo.getInputStream(), this.raiz.resolve(nomeArquivo), StandardCopyOption.REPLACE_EXISTING);
            return nomeArquivo;
        } catch (IOException e) {
            throw new RuntimeException("Não foi possível salvar a imagem: " + e.getMessage());
        }
    }

    public void excluir(String nomeArquivo) {
        try {
            if (nomeArquivo != null) {
                Files.deleteIfExists(this.raiz.resolve(nomeArquivo));
            }
        } catch (IOException e) {
            System.err.println("Erro ao excluir arquivo: " + e.getMessage());
        }
    }
}
