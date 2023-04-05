package com.ssafy.herenotification.repository;

import com.ssafy.herenotification.entity.Member;
import com.ssafy.herenotification.entity.Notification;
import com.ssafy.herenotification.enumeration.EnumNotificationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findAllByReceiverOrderByCreatedDateDesc(Member receiver);
    List<Notification> findAllByReceiverAndStatusOrderByCreatedDateDesc(Member receiver, EnumNotificationStatus status);
    Optional<Notification> findByIdAndReceiver(Long notificationId, Member Receiver);
}