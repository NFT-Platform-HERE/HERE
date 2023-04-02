package com.ssafy.herenotification.repository;

import com.ssafy.herenotification.entity.Member;
import com.ssafy.herenotification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findAllByReceiver(Member member);
}