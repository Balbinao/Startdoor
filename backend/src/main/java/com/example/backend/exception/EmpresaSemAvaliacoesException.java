package com.example.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
public class EmpresaSemAvaliacoesException extends RuntimeException {
    public EmpresaSemAvaliacoesException(String message) {
        super(message);
    }
}
