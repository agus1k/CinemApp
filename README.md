# CinemApp - Sistema de Reservas para Cines

## Descripción
CinemApp es una aplicación backend desarrollada en **Java** con **Spring Boot** que permite gestionar reservas de funciones de cine. Los usuarios pueden registrarse, consultar funciones y realizar reservas, mientras que los administradores pueden gestionar películas y funciones.

## Tecnologías Utilizadas
- **Lenguaje:** Java 17
- **Framework:** Spring Boot 3.4.3
- **Base de Datos:** MySQL
- **Autenticación:** Spring Security con JWT
- **Gestor de Dependencias:** Maven

## Instalación y Configuración
### Prerrequisitos
- Tener instalado Java 17 o superior.
- Tener configurado Maven.
- Tener acceso a un servidor MySQL.

### Configuración de la Base de Datos
Modificar el archivo `application.properties` con los datos de la base de datos:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/cinemapp
spring.datasource.username=TU_USUARIO
spring.datasource.password=TU_CONTRASEÑA
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

### Ejecución del Proyecto
Para ejecutar el backend, usa el siguiente comando:
```sh
mvn spring-boot:run
```

## Endpoints Principales

### **Películas** (`MovieRestController`)
- `GET /movies` → Obtiene la lista de películas.
- `POST /movies` → Crea una nueva película (solo admin).
- `PUT /movies/update/{id}` → Actualiza una película (solo admin).
- `DELETE /movies/delete/{id}` → Elimina una película (solo admin).

### **Funciones** (`FunctionRestController`)
- `GET /functions` → Lista todas las funciones disponibles.
- `GET /functions/by-date` → Lista funciones filtradas por fecha.
- `POST /functions` → Crea una nueva función (solo admin).
- `PUT /functions/update/{id}` → Actualiza una función (solo admin).
- `DELETE /functions/delete/{id}` → Elimina una función (solo admin).

### **Reservas** (`BookingRestController`)
- `POST /bookings/new` → Crea una nueva reserva.
- `POST /bookings/cancel/{bookingId}` → Cancela una reserva.

### **Usuarios** (`UserRestController`)
- `POST /register` → Registra un nuevo usuario.

### **Asientos** (`SeatRestController`)
- `GET /seats/{functionId}` → Obtiene los asientos disponibles para una función.

## Seguridad y Roles
- **Admin**: Puede gestionar películas y funciones.
- **User**: Puede registrarse, ver funciones y reservar asientos.

La autenticación se maneja con **JWT**. Para acceder a los endpoints protegidos, los usuarios deben autenticarse y enviar el token en la cabecera `Authorization: Bearer <TOKEN>`.

**Autor:** [Agustin Miranda]  

