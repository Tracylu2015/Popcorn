package com.popcornbackend.utils;

import java.util.ArrayList;

public class Collections {
    public static <E> ArrayList<E> of(E e) {
        ArrayList<E> es = new ArrayList<E>();
        es.add(e);
        return es;
    }
}
