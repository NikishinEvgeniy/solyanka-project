package moex.com.tp_ivt_team4_2026.library.paging.mapper;


import moex.com.tp_ivt_team4_2026.library.paging.model.PageResponseDTO;
import org.springframework.data.domain.Page;
import java.util.function.Function;

public class PageMapper {
    public static <T, R> PageResponseDTO<R> map(Page<T> page, Function<T, R> mapper) {
        return new PageResponseDTO<>(
                page.getContent().stream().map(mapper).toList(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast()
        );
    }
}