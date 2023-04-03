package com.ssafy.herenotification.dto.notification;

import com.ssafy.herenotification.enumeration.EnumNotificationCode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SaveNotificationRequestDto {
    @NotNull(message = "senderId는 필수 값입니다.")
    private UUID senderId;

    @NotNull(message = "receiverId는 필수 값입니다.")
    private UUID receiverId;

    @NotNull(message = "content는 필수 값입니다.")
    @NotBlank(message = "content를 입력해주세요")
    private String content;

    @NotNull(message = "code는 필수 값입니다.")
    private EnumNotificationCode code;
}
