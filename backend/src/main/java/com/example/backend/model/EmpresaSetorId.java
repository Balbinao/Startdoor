package com.example.backend.model;

import java.io.Serializable;
import java.util.Objects;

public class EmpresaSetorId implements Serializable {
    private Long empresaId;
    private Long setorId;

    public EmpresaSetorId() {}

    public EmpresaSetorId(Long empresaId, Long setorId) {
        this.empresaId = empresaId;
        this.setorId = setorId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EmpresaSetorId that = (EmpresaSetorId) o;
        return Objects.equals(empresaId, that.empresaId) && Objects.equals(setorId, that.setorId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(empresaId, setorId);
    }
}