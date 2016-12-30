/*
 * Copyright (c) 2016. Kloudtek Software Solutions Ltd
 */

package com.kloudtek.drc.mule;

import com.kloudtek.util.StringUtils;
import org.mule.api.MuleEventContext;
import org.mule.api.lifecycle.Callable;
import org.mule.modules.sqs.model.Message;
import org.mule.modules.sqs.model.MessageAttributeValue;

import java.nio.ByteBuffer;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by yannick on 12/29/16.
 */
public class CreateSQSMessage implements Callable {
    @Override
    public Object onCall(MuleEventContext ctx) throws Exception {
        Message message = new Message();
        message.setMessageBody(new String(ctx.getMessage().getInvocationProperty("data"),"UTF-8"));
        HashMap<String,MessageAttributeValue> attributes = new HashMap<>();
        Map<String,Map<String,String>> metamap = ctx.getMessage().getInvocationProperty("metadata");
        for (Map.Entry<String, Map<String, String>> entry : metamap.entrySet()) {
            MessageAttributeValue attr = new MessageAttributeValue();
            String type = entry.getValue().get("type");
            if(StringUtils.isEmpty(type)) {
                throw new IllegalArgumentException("metadata type is missing");
            }
            attr.setDataType(type);
            String value = entry.getValue().get("value");
            if(value == null) {
                throw new IllegalArgumentException("metadata value is null");
            }
            if( type.startsWith("Binary") ) {
                attr.setBinaryValue(ByteBuffer.wrap(Base64.getDecoder().decode(value)));
            } else {
                attr.setStringValue(value);
            }
            attributes.put(entry.getKey(),attr);
        }
        message.setMessageAttributes(attributes);
        return message;
    }
}
