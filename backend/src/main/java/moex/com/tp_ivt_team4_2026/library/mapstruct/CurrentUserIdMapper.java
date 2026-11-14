package moex.com.tp_ivt_team4_2026.library.mapstruct;

import org.mapstruct.Named;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class CurrentUserIdMapper {

    @Named("currentAuthorId")
    public UUID getCurrentUserId(Object ignoredEntity) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof Jwt jwt) {
            String subject = jwt.getSubject();
            return UUID.fromString(subject);
        }
        throw new IllegalStateException("JWT token not found in SecurityContext");
    }
}