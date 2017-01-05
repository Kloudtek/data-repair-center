package com.kloudtek.drc.mule;

import org.apache.commons.io.IOUtils;
import org.mule.api.MuleEventContext;
import org.mule.api.lifecycle.Callable;
import org.mule.api.transport.PropertyScope;

import java.io.InputStream;

import static org.mule.api.transport.PropertyScope.INBOUND;

/**
 * Created by yannick on 1/4/17.
 */
public class ServeUI implements Callable {
    private static InputStream indexRes;

    static {
        indexRes = ServeUI.class.getResourceAsStream("/drcui/index.html");
        if( indexRes == null ) {
            throw new RuntimeException("/drcui/index.html not found");
        }
    }

    @Override
    public Object onCall(MuleEventContext ctx) throws Exception {
        String path = ctx.getMessage().getProperty("http.request.path", INBOUND);
        if( path.contains("..") ) {
            throw new IllegalArgumentException("Path must not contain ..");
        }
        if( path.startsWith("/ui/") ) {
            path = path.substring(4,path.length());
        }
        if( path.equals("") ) {
            path = "index.html";
        }
        InputStream res = getClass().getResourceAsStream("/drcui/"+path);
        String contentType = null;
        if( res == null ) {
            res = indexRes;
            contentType = "text/html";
        }
        if( path.endsWith(".svg") ) {
            contentType = "image/svg+xml";
        } else if( path.endsWith(".css") ) {
            contentType = "text/css";
        } else if( path.endsWith(".png") ) {
            contentType = "image/png";
        }
        if( contentType != null ) {
            ctx.getMessage().setOutboundProperty("Content-Type",contentType);
        }
        return IOUtils.toByteArray(res);
    }
}
