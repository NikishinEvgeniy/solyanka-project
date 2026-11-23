package moex.com.tp_ivt_team4_2026.library.paging.model;

import java.util.List;

public class Paging<T> {
    public String dataType;
    public List<T> data;
    public int page;
    public int size;
    public Long totalElements;
    public int totalPages;
    public boolean last;
}
