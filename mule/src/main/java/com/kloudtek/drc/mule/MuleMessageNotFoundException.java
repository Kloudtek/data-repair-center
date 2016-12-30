/*
 * Copyright (c) 2016. Kloudtek Software Solutions Ltd
 */

package com.kloudtek.drc.mule;

import org.mule.api.MuleEventContext;
import org.mule.api.lifecycle.Callable;

/**
 * Created by yannick on 12/29/16.
 */
public class MuleMessageNotFoundException extends Exception implements Callable {
    public MuleMessageNotFoundException() {
    }

    public MuleMessageNotFoundException(String message) {
        super(message);
    }

    public MuleMessageNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public MuleMessageNotFoundException(Throwable cause) {
        super(cause);
    }

    @Override
    public Object onCall(MuleEventContext muleEventContext) throws Exception {
        throw new MuleMessageNotFoundException();
    }
}
