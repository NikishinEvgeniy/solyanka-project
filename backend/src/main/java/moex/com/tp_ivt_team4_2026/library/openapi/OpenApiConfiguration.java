package moex.com.tp_ivt_team4_2026.library.openapi;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

/**
 * <center><b>Класс конфигурации</b></center>
 * <p>
 *  Данный класс обеспечивает настройку дополнительных возможностей для спецификаций.
 * </p>
 *
 * @author evgeniy
 * @since 10/24/26
 */
@Configuration
@OpenAPIDefinition(security = {@SecurityRequirement(name = "BearerAuthentication") })
@SecurityScheme(name = "BearerAuthentication", type = SecuritySchemeType.HTTP,  scheme = "bearer", bearerFormat = "JWT")
public class OpenApiConfiguration {
}