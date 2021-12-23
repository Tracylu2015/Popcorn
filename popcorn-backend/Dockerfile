FROM maven:3.8.4-openjdk-11-slim as builder

COPY popcorn-backend /build
RUN cd /build && mvn clean package -DskipTests

FROM openjdk:11.0.13-jre-slim
RUN mkdir /app
COPY --from=builder /build/target/*.jar /app

WORKDIR /app

ENTRYPOINT ["java","-jar","popcorn-backend-0.0.1-SNAPSHOT.jar"]
