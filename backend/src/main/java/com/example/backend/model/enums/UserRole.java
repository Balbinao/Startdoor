package com.example.backend.model.enums;

public enum UserRole {
    ADMIN("admin"),
    ESTUDANTE("estudante"),
    EMPRESA("empresa");

    private String role;

    UserRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
