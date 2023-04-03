package com.ssafy.herenotification.repository;

import com.ssafy.herenotification.entity.Member;
import com.ssafy.herenotification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findAllByReceiver(Member member);
    List<Notification> findAllByReceiverOrderByCreatedDate(Member receiver);
    Optional<Notification> findByIdAndReceiver(Long notificationId, Member Receiver);
}