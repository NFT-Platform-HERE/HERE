package com.ssafy.hereauth.repository;

import com.ssafy.hereauth.entity.Member;
import com.ssafy.hereauth.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findAllByReceiverOrderByCreatedDate(Member receiver);
    Optional<Notification> findByIdAndReceiver(Long notificationId, Member Receiver);
}
