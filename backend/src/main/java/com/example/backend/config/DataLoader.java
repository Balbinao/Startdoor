package com.example.backend.config;

import com.example.backend.model.Admin;
import com.example.backend.model.Setor;
import com.example.backend.repository.AdminRepository;
import com.example.backend.repository.SetorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final SetorRepository setorRepository;

    public DataLoader(AdminRepository adminRepository, SetorRepository setorRepository) {
        this.adminRepository = adminRepository;
        this.setorRepository = setorRepository;
    }

    @Override
    public void run(String... args) throws Exception {
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

        if (setorRepository.count() == 0) {
            List<String> setores = Arrays.asList(
                "Administrativo",
                "Comercial",
                "Engenharia",
                "Financeiro",
                "Jurídico",
                "Marketing",
                "Recursos Humanos",
                "Tecnologia da Informação",
                "Outro"
            );

            for (String nome : setores) {
                Setor setor = new Setor();
                setor.setNome(nome);
                setorRepository.save(setor);
            }

            System.out.println("✅ Setores pré-cadastrados criados: " + setores.size());
        }
    }
}