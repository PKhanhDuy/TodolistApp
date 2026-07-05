# syntax=docker/dockerfile:1

# ---- Build stage ----
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app

# Copy Maven wrapper + pom first to cache dependency downloads
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw -B dependency:go-offline

# Copy source and build the jar
COPY src ./src
RUN ./mvnw -B clean package -DskipTests

# ---- Runtime stage ----
FROM eclipse-temurin:17-jre-alpine AS runtime
WORKDIR /app

# Run as a non-root user for better security
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
