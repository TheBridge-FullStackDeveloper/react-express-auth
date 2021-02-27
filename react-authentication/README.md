# Requisitos para React Auth

- Un server con un proceso de autenticación (documentado) y accesible desde el frontend
- Un state para almacenar la información o el status del user de alguna forma.
- Un context global para gestionar la auteticación y compartirla con toda la App.
- Instalar react-router-dom para validar los accesos del user y redigirlo en caso de que sea necesario.

- Adicionalmente podemos mostrar un mensaje de error al user cuando hace un login/register no válido con [react-toastify](https://fkhadra.github.io/react-toastify/introduction/)

## Ejercicio 1

- Separar cada ruta en un componente que se conecte al Context y gestione la información tal y como hacemos ahora.
- Copiar la funcionalidad de `login` en una nueva funcionalidad `register` o `signup` que añada un nuevo user a nuestro servidor.
  Por tanto, tendremos que crear un nuevo endpoint `/register` en el server que haga un push al array de users.
- Simular un logout mediante una función en `useAuthentication()` que elimine el state de user (lo convierta a null) y simule un cierre de sesión pulsando un botón `logout`.
  El botón logout solo será visible cuando existe un user.
