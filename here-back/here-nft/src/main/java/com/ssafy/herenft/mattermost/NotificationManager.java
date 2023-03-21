package com.ssafy.herenft.mattermost;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationManager {

    private Logger logger = LoggerFactory.getLogger(MatterMostSender.class);

    @Autowired
    private MatterMostSender mmSender;

    public void sendNotification(Exception e, String uri, String params) {
        logger.info("### SEND Notification");
        mmSender.sendMessage(e, uri, params);
    }
}
