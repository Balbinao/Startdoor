package com.example.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final SecurityFilter securityFilter;

    public SecurityConfig(SecurityFilter securityFilter) {
        this.securityFilter = securityFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        // ========== ENDPOINTS PÚBLICOS ==========
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/cadastrar/**").permitAll()
                        
                        // Swagger - público
                        .requestMatchers(
                            "/swagger-ui/**",
                            "/swagger-ui.html",
                            "/v3/api-docs/**",
                            "/api-docs/**"
                        ).permitAll()
                        
                        // ========== EMPRESAS ==========
                        // GET - todos podem ver (estudantes precisam consultar empresas)
                        .requestMatchers(HttpMethod.GET, "/empresas/**").permitAll()
                        
                        // PUT - apenas a própria empresa ou admin
                        .requestMatchers(HttpMethod.PUT, "/empresas/**").hasAnyRole("EMPRESA", "ADMIN")
                        
                        // DELETE - apenas admin
                        .requestMatchers(HttpMethod.DELETE, "/empresas/**").hasRole("ADMIN")
                        
                        // ========== ESTUDANTES ==========
                        // GET /estudantes (lista) - apenas admin (dados sensíveis)
                        .requestMatchers(HttpMethod.GET, "/estudantes").hasRole("ADMIN")
                        
                        // GET /estudantes/{id} - próprio estudante ou admin
                        .requestMatchers(HttpMethod.GET, "/estudantes/{id}").hasAnyRole("ESTUDANTE", "ADMIN")
                        
                        // PUT /estudantes/{id} - próprio estudante ou admin
                        .requestMatchers(HttpMethod.PUT, "/estudantes/{id}").hasAnyRole("ESTUDANTE", "ADMIN")
                        
                        // DELETE /estudantes/{id} - apenas admin
                        .requestMatchers(HttpMethod.DELETE, "/estudantes/**").hasRole("ADMIN")
                        
                        // ========== ADMIN ==========
                        // ADMIN
                        .requestMatchers("/admin/**").hasRole("ADMIN") 
                        .anyRequest().authenticated()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList(
            "Authorization", 
            "Content-Type", 
            "X-Requested-With"
        ));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}