FROM openjdk:17-jdk-alpine
RUN mkdir -p /home/app
COPY ./target/demo1-0.0.1-SNAPSHOT.jar nom.jar
CMD ["java","-jar","nom.jar"]