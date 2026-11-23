package moex.com.tp_ivt_team4_2026.library.paging.model;

import moex.com.tp_ivt_team4_2026.library.paging.model.Paging;
import java.util.List;

public class PagingBuilder<T> {
    private Paging<T> paging;

    public PagingBuilder(){
        paging = new Paging<T>();
    }

    public PagingBuilder<T> setDataType(String dataType){
        paging.dataType = dataType;
        return this;
    }
    public PagingBuilder<T> setData(List<T> data){
        paging.data = data;
        return this;
    }
    public
}
