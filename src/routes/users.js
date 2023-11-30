const Router = require('koa-router');
const router = new Router();
const bcrypt = require('bcrypt');

// Ruta get para obtener todos los usuarios
router.get("users.list", "/", async (ctx) => {
  try {
    const users = await ctx.orm.User.findAll();
    ctx.body = users;
    ctx.status = 200; // 200: Exitoso, muestra todos los usuarios
  } catch (error) {
    ctx.body = error;
    ctx.status = 400; // 400: Error en la solicitud
  }
});

// Ruta get para obtener usuario según ID
router.get("users.show", "/:id", async (ctx) => {
  try {
    const user = await ctx.orm.User.findOne({ where: { id: ctx.params.id } });
    if (user) {
      ctx.body = user;
      ctx.status = 200; // 200: Exitoso encontro el usuario
    } else {
      ctx.body = "User not found";
      ctx.status = 404; //Si no lo encuentra: BAD REQUEST
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400; // 4000: Error en la solicitud
  }
});

// Ruta para obtener ID de usuario según email
router.get("users.showbyemail", "/email/:email", async (ctx) => {
  try {
    const user = await ctx.orm.User.findOne({
      attributes: ['id'],
      where: { email: ctx.params.email },
    });
    if (user) {
      ctx.body = user.id;
      ctx.status = 200; // 200: Éxito - se encontró el usuario
    } else {
      ctx.status = 404;
      ctx.body = "User not found";
    }
  } catch (error) {
    // Manejar errores generales
    console.error(error);
    ctx.status = 500; // 500: Error interno del servidor
    ctx.body = "Internal server error";
  }
});
// Ruta put para actualizar la información de un usuario
router.put("users.update", "/:id", async (ctx) => {
  try {
    const user = await ctx.orm.User.findOne({ where: { id: ctx.params.id } });
    if (user) {
      const newPassword = ctx.request.body.password;

      if (newPassword) {
        // If a new password is provided, rehash it
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        ctx.request.body.password = hashedPassword;
      }

      await user.update(ctx.request.body);
      ctx.body = user;
      ctx.status = 200;
    } else {
      ctx.body = "User not found";
      ctx.status = 404; // No encontró al usuario
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// Ruta delete para eliminar un usuario
router.delete("users.delete", "/:id", async (ctx) => {
  try {
    const user = await ctx.orm.User.findOne({ where: { id: ctx.params.id } });
    if (user) {
      await user.destroy();
      ctx.status = 204; // 204 No Content indicates a successful delete
    } else {
      ctx.body = "User not found"
      ctx.status = 404; // Error en la solicitud (asociado a un perfil, no se encontró el usuario - Bad Request)
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// Exportar

module.exports = router;