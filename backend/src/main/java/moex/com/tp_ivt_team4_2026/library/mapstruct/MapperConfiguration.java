package moex.com.tp_ivt_team4_2026.library.mapstruct;

import org.mapstruct.MapperConfig;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

/**
 * <center><b>Класс конфигурации</b></center>
 * <p>
 *  Данный класс задает конфигурацию для всех преобразователей в проекте.
 * </p>
 *
 * @author evgeniy
 * @since 11/2/26
 */
@MapperConfig(
        unmappedTargetPolicy = ReportingPolicy.ERROR,
        componentModel = MappingConstants.ComponentModel.SPRING)
public interface MapperConfiguration {
}