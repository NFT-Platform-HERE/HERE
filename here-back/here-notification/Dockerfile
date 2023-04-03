FROM adoptopenjdk/openjdk11
COPY build/libs/here-notification-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=dev", "app.jar"]
