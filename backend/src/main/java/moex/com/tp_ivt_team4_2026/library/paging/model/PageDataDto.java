package moex.com.tp_ivt_team4_2026.library.paging.model;

public record PageDataDto(
        int page,
        int size,
        long totalElements,
        int totalPages,
        boolean last
) {}