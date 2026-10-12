package moex.com.tp_ivt_team4_2026.library.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * <center><b>Класс конфигурации</b></center>
 *
 * <p>Данный класс отвечает за конфигурацию фильтров безопасности</p>
 *
 * @author Евгений
 * @since 11.10.2026
 */
@Configuration
public class SecurityConfiguration {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(request -> request.anyRequest().authenticated())
                .oauth2ResourceServer(serverConfigurer -> serverConfigurer.jwt(Customizer.withDefaults()))
                .build();
    }
}