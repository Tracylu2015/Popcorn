package com.popcornbackend.utils;

import java.util.ArrayList;
import java.util.List;

public class Collections {
    public static <E> ArrayList<E> of(E e) {
        ArrayList<E> es = new ArrayList<E>();
        es.add(e);
        return es;
    }

    public static <E> boolean isEmpty(List<E> list) {
        return list == null || list.size() == 0;
    }
}
