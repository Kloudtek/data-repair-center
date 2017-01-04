/*
 * Copyright (c) 2016. Kloudtek Software Solutions Ltd
 */

package com.kloudtek.drc.mule;

import org.mule.api.MuleEventContext;
import org.mule.api.lifecycle.Callable;

/**
 * Created by yannick on 12/29/16.
 */
public class UnsupportedOriginException extends Exception implements Callable {
    public UnsupportedOriginException() {
    }

    public UnsupportedOriginException(String origin) {
        super("Data has an unsupported origin: "+origin);
    }

    @Override
    public Object onCall(MuleEventContext muleEventContext) throws Exception {
        throw new UnsupportedOriginException(muleEventContext.getMessageAsString());
    }
}
