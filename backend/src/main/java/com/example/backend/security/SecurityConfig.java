package com.example.backend.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
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

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
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
                .exceptionHandling(exceptions -> exceptions
                    .authenticationEntryPoint((request, response, authException) -> {
                        response.setStatus(HttpStatus.FORBIDDEN.value());
                        response.setContentType("application/json");
                        
                        Map<String, Object> body = new HashMap<>();
                        body.put("timestamp", LocalDateTime.now().toString());
                        body.put("status", HttpStatus.FORBIDDEN.value());
                        body.put("message", "Acesso negado: token ausente ou inválido");
                        
                        ObjectMapper mapper = new ObjectMapper();
                        response.getWriter().write(mapper.writeValueAsString(body));
                    })
                    .accessDeniedHandler((request, response, accessDeniedException) -> {
                        response.setStatus(HttpStatus.FORBIDDEN.value());
                        response.setContentType("application/json");
                        
                        Map<String, Object> body = new HashMap<>();
                        body.put("timestamp", LocalDateTime.now().toString());
                        body.put("status", HttpStatus.FORBIDDEN.value());
                        body.put("message", "Acesso negado: você não tem permissão para acessar este recurso");
                        
                        ObjectMapper mapper = new ObjectMapper();
                        response.getWriter().write(mapper.writeValueAsString(body));
                    })
                )
                .authorizeHttpRequests(authorize -> authorize
                        // ========== ENDPOINTS PÚBLICOS ==========
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/estudantes/cadastrar/estudante").permitAll()
                        .requestMatchers(HttpMethod.POST, "/empresas/cadastrar/empresa").permitAll()
                        
                        // Swagger - público
                        .requestMatchers(
                            "/swagger-ui/**",
                            "/swagger-ui.html",
                            "/v3/api-docs/**",
                            "/api-docs/**"
                        ).permitAll()
                        
                        // ========== EMPRESAS ==========
                        .requestMatchers(HttpMethod.GET, "/empresas/**").permitAll()  // Público
                        .requestMatchers(HttpMethod.PUT, "/empresas/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/empresas/**").authenticated()  // @PreAuthorize cuida
                        
                        // ========== ESTUDANTES ==========
                        .requestMatchers(HttpMethod.GET, "/estudantes").hasRole("ADMIN")  // Só admin vê lista
                        .requestMatchers(HttpMethod.GET, "/estudantes/**").authenticated()  // @PreAuthorize cuida
                        .requestMatchers(HttpMethod.PUT, "/estudantes/**").authenticated()  // @PreAuthorize cuida
                        .requestMatchers(HttpMethod.DELETE, "/estudantes/**").authenticated()  // @PreAuthorize cuida
                        
                        // ========== ADMIN ==========
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