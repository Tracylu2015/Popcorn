FROM maven:3.8.4-openjdk-11-slim as builder

COPY . /build
RUN cd /build && mvn clean package -DskipTests

FROM openjdk:8u312-jre
RUN mkdir /app
COPY --from=builder /build/target/*.jar /app
WORKDIR /app

ENTRYPOINT ["java","-jar","popcorn-backend-0.0.1-SNAPSHOT.jar"]
