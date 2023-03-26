package com.ssafy.hereauth.repository;

import com.ssafy.hereauth.entity.Member;
import com.ssafy.hereauth.entity.Notification;
import com.ssafy.hereauth.enumeration.EnumNotificationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findAllByReceiverOrderByCreatedDate(Member receiver);
//    List<Notification> findAllByReceiverAndStatus(Member receiver, EnumNotificationStatus status);
    Optional<Notification> findByIdAndReceiver(Long notificationId, Member Receiver);
}
