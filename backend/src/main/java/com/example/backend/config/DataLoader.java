package com.example.backend.config;

import com.example.backend.model.Admin;
import com.example.backend.repository.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final AdminRepository adminRepository;

    public DataLoader(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Criar admin padrão se não existir nenhum
        if (adminRepository.count() == 0) {
            Admin admin = new Admin();
            admin.setEmail("admin@startdoor.com");
            admin.setSenha(new BCryptPasswordEncoder().encode("123456"));
            admin.setUser("admin");
            
            adminRepository.save(admin);
            
            System.out.println("✅ Admin padrão criado:");
            System.out.println("   Email: admin@startdoor.com");
            System.out.println("   Senha: 123456");
        }
    }
}