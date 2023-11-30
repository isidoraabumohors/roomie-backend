# grupo_equipazo_backend


## Instalación BDD y Documentación API:

El proyecto funciona con una BDD en Postgres. La estructura de dicha base de datos, en términos de las tablas y sus atributos, se puede ver en el diagaram E/R (cabe destacar que por defecto se agregan los atributos createdAt y updatedAt para cada modelo). Para las interacciones con la API creada utilizando Koa, se hace uso de Sequelize. Los comandos para poder definir la bases de datos en local y para la posterior conexión con el frontend se detallan a continuación. Además, para esta entrega se hizo uso de JWT para manejar los registros e inicios de sesión. 

Ejecutar los siguientes comandos en el terminal del computador para la BDD: (Las siguientes instrucciones corresponden para la instalación en Mac).

*psql postgres*
*CREATE USER roomie_admin WITH PASSWORD 'admin123';*
*ALTER USER roomieadmin CREATEDB;*
*\q*

*psql -U roomie_admin -d postgres*
*CREATE DATABASE roomie_development;*
*\q*

*psql -U usuario -d roomie_development*
*GRANT ALL PRIVILEGES ON DATABASE roomie_development TO roomie_admin;*
*\q*

Incluir las siguientes dependencias:

*yarn add @koa/cors*
*yarn add koa*
*yarn add koa-logger koa-body*
*yarn add koa-router*
*yarn add nodemon*
*yarn add dotenv*
*yarn add sequelize*
*yarn add sequelize-cli*
*yarn add pg*
*yarn add jsonwebtoken*
*yarn add koa-jwt*
*yarn add bcrypt*


Crear archivo .env para la conexión con la base de datos:

DB_USER=roomie_admin
DB_PASSWORD=admin123
DB_NAME=roomie
DB_HOST=localhost
JWT_SECRET=jwt_secret
ADMIN_PASSWORD = admin123

Crear archivo .gitignore:

node_modules/
.env

Para migrar la base de datos:

*yarn sequelize-cli db:migrate*

Para ejecutar las semillas:

*yarn sequelize-cli db:seed:all*

Para iniciar el backend:

*yarn dev* (Puede ser necesario yarn add dev antes)

Para utilizar eslint (corrector de sintaxis y problemas)
*yarn add eslint*
*npx eslint src/*

Para la presente entrega, se crearon endpoints de tipo GET, POST, PUT y DELETE, para los modelos trabajados, logrando completar los CRUDS. El detalle se encuentra en la documentación generada en Postman. 

https://documenter.getpostman.com/view/30780458/2s9YRGxUPb


Para esta entrega, se encuentran conectados todos los endpoints que se requieren para un flujo correcto a través de la aplicación. Es decir, se encuentra completa la navegación para un usuario común, junto con todas funcionalidades. Esto incluye crear, editar y eliminar un usuario, crear y eliminar perfiles, y dentro de cada perfil, poder realizar swipes hacia distintos perfiles que no han sido swipeados antes y que se encuentran en la misma ubicación. En base a esto, se crean matches, que se pueden visualizar desde la vista específica para esto. Aquí, se puede eliminar un match, se puede ver la información del usuario con quién se ha realizado el match, y se puede acceder a un chat con dicho usuario. Cabe destacar que los mensajes y los chats no pueden ser eliminados por un usuario sin atribuciones especiales (tales como la del administrador, que será implementado más adelante). 

Observación importante: para crear el usuario, en el campo de foto de perfil, se espera que el usuario ingrese una URL válida para una imagen disponible en la web. 
