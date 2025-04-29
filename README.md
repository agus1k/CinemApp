# 🎬 CinemApp - Sistema de Reservas para Cines

## 📝 Descripción
CinemApp es una aplicación backend desarrollada en **Java** con **Spring Boot** que permite gestionar reservas de funciones de cine. Los usuarios pueden registrarse, consultar funciones y realizar reservas, mientras que los administradores pueden gestionar películas y funciones.

## 🚀 Tecnologías Utilizadas
- **Lenguaje:** Java 17
- **Framework:** Spring Boot 3.4.3
- **Base de Datos:** MySQL
- **Autenticación:** Spring Security con JWT
- **Gestor de Dependencias:** Maven

## ⚙️ Instalación y Configuración

### 📦 Prerrequisitos
- Tener instalado Java 17 o superior.
- Tener configurado Maven.
- Tener acceso a un servidor MySQL.

### 🛠️ Configuración de la Base de Datos
Modificar el archivo `application.properties` con los datos de la base de datos:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/cinemapp
spring.datasource.username=TU_USUARIO
spring.datasource.password=TU_CONTRASEÑA
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

### ▶️ Ejecución del Proyecto
```bash
mvn spring-boot:run
```

## 📡 Endpoints Principales

### 🎥 **Películas** (`MovieRestController`)
- `GET /movies` → Lista todas las películas.
```json
[
  {
    "id": 1,
    "title": "Inception",
    "description": "Some description for Inception",
    "genre": "Ciencia Ficción"
  },
  {
    "id": 2,
    "title": "Titanic",
    "description": "Some description for Titanic",
    "genre": "Romance"
  }
]
```
- `POST /movies` → Crear una nueva película (solo admin).
```json
{
  "title": "Gladiator",
  "description": "Some description for Gladiator",
  "genreId": 3
}
```
```json
{
  "id": 5,
  "description": "Some description for Gladiator",
  "genre": "Acción"
}
```

### 🕒 **Funciones** (`FunctionRestController`)
- `GET /functions` → Lista todas las funciones disponibles.
```json
[
  {
    "id": 10,
    "movie": "Taxi Driver",
    "auditoriumId": "4",
    "showtime": "2025-04-11T20:00:00"
  }
]
```
- `POST /functions` → Crear una nueva función (solo admin).
```json
{
  "movieId": 1,
  "auditoriumId": 2,
  "showtime": "2025-04-12T18:00:00"
}
```

### 🎟️ **Reservas** (`BookingRestController`)
- `POST /bookings/new` → Crear nueva reserva.
```json
{
  "userId": 3,
  "functionId": 10,
  "seatId": 25
}
```
```json
{
  "message": "Reserva realizada con éxito.",
  "booking": {
    "user": "agustin",
    "movie": "Inception",
    "seat": "B5",
    "showtime": "2025-04-11T20:00:00"
  }
}
```

### 👤 **Usuarios** (`UserRestController`)
- `POST /register` → Registro de usuario.
```json
{
  "username": "agustin",
  "password": "123456"
}
```
- `POST /login` → Inicio de sesión.
```json
{
  "username": "agustin",
  "password": "123456"
}
```
```json
{
  "message": "Iniciaste sesión con éxito!",
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

### 💺 **Asientos** (`SeatRestController`)
- `GET /seats/{functionId}` → Asientos disponibles para una función.
```json
[
  {
    "seatId": 1,
    "number": "1",
    "available": true
  },
  {
    "seatId": 2,
    "number": "2",
    "available": true
  }
]
```
## 🧩 Otros endpoints
`PUT /movies/update/{id}` → Actualiza una película (solo admin).
`DELETE /movies/delete/{id}` → Elimina una película (solo admin).
`GET /functions/by-date` → Lista funciones filtradas por fecha.
`PUT /functions/update/{id}` → Actualiza una función (solo admin).
`DELETE /functions/delete/{id}` → Elimina una función (solo admin).
`PUT /functions/update/{id}` → Actualiza una función (solo admin).
`DELETE /functions/delete/{id}` → Elimina una función (solo admin).


## 🔐 Seguridad y Roles
- **Admin:** Puede gestionar películas y funciones.
- **User:** Puede registrarse, ver funciones y reservar asientos.

La autenticación se maneja con **JWT**. Para acceder a los endpoints protegidos, el token debe enviarse en la cabecera:
```
Authorization: Bearer <TOKEN>
```

---

## ⚠️ Nota Final

Este proyecto es una **API REST**, es decir, una aplicación que gestiona datos y lógica del lado del servidor. No tiene una interfaz visual, ya que está diseñada para ser **consumida por un cliente externo** (por ejemplo, una app web o móvil).

💡 Actualmente estoy desarrollando el **frontend de CinemApp**, que se conectará con esta API para brindar una experiencia completa al usuario.

---

## 👨‍💻 Autor
**Agustin Miranda**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn--blue?style=social&logo=linkedin)](https://www.linkedin.com/in/agustinmiranda16/) 
