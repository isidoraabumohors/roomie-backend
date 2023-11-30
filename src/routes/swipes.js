const Router = require('koa-router');
const router = new Router();
const { Op } = require('sequelize');

// Ruta post para crear un swipe
router.post("swipes.create", "/", async (ctx) => {
  try {
    const swipe = await ctx.orm.Swipe.create(ctx.request.body);
    ctx.body = swipe; // Devuelve el swipe creado
    ctx.status = 201; // 201: Crea exitosamente el swipe
  } catch (error) {
    ctx.body = error;
    ctx.status = 400; // 400: Error en la solicitud (Sequelize Validation Error)
  }
});

// Ruta get para obtener todos los swipes
router.get("swipes.list", "/", async (ctx) => {
  try {
    const swipes = await ctx.orm.Swipe.findAll();
    ctx.body = swipes;
    ctx.status = 200; // 200: Exitoso, muestra todos los usuarios
  } catch (error) {
    ctx.body = error;
    ctx.status = 400; // 400: Error en la solicitud
  }
});

// Ruta para obtener swipes según profile_id (swiper)
router.get("swipes.listByProfile", "/profile/:profile_id/swiper", async (ctx) => {
  try {
    const swipes = await ctx.orm.Swipe.findAll({
      where: {
        swiper_profile_id: ctx.params.profile_id,
      },
    });

    if (swipes.length > 0) {
      ctx.body = swipes;
      ctx.status = 200; // 200: Exitoso, muestra los swipes según profile_id (swiper)
    } else {
      ctx.body = "Swipes not found for given profile_id";
      ctx.status = 200; // 200: Exitoso, solo que no hay swipes aún
    }
  } catch (error) {
    ctx.body = { error: error.message };
    ctx.status = 400; // 400: Error en la solicitud
  }
});

// Ruta para obtener swipes según profile_id (swiped)
router.get("swipes.listByProfile", "/profile/:profile_id/swiped", async (ctx) => {
  try {
    const swipes = await ctx.orm.Swipe.findAll({
      where: {
        swiped_profile_id: ctx.params.profile_id,
      },
    });

    if (swipes.length > 0) {
      ctx.body = swipes;
      ctx.status = 200; // 200: Exitoso, muestra los swipes según profile_id (swiped)
    } else {
      ctx.body = "Swipes not found for given profile_id";
      ctx.status = 200; // 200: Exitoso, solo que no hay swipes aún
    }
  } catch (error) {
    ctx.body = { error: error.message };
    ctx.status = 400; // 400: Error en la solicitud
  }
});


// Ruta get para swipes según ID
router.get("swipes.show", "/:id", async (ctx) => {
  try {
    const swipe = await ctx.orm.Swipe.findOne({ where: { id: ctx.params.id } });
    if (swipe) {
      ctx.body = swipe;
      ctx.status = 200; // 200: Exitoso encontro el swipe
    } else {
      ctx.body = "Swipe not found";
      ctx.status = 404;
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400; // 4000: Error en la solicitud
  }
});

// Ruta put para actualizar la información de un swipe
router.put("swipes.update", "/:id", async (ctx) => {
  try {
    const swipe = await ctx.orm.Swipe.findOne({ where: { id: ctx.params.id } });
    if (swipe) {
      await swipe.update(ctx.request.body);
      ctx.body = swipe;
      ctx.status = 200;
    } else {
      ctx.body = "Swipe not found";
      ctx.status = 404; // No encontró al swipe
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});


// Ruta delete para eliminar un swipe
router.delete("swipes.delete", "/:id", async (ctx) => {
  try {
    const swipe = await ctx.orm.Swipe.findOne({ where: { id: ctx.params.id } });
    if (swipe) {
      await swipe.destroy();
      ctx.status = 204; // 204 No Content indicates a successful delete
      ctx.body = "Swipe deleted";
    } else {
      ctx.body = "Swipe not found";
      ctx.status = 404; // Error en la solicitud (Bad Request)
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// Ruta para eliminar swipes por profile_id
router.delete("swipes.deleteByProfile", "/profile/:profile_id", async (ctx) => {
  try {
    // Verifica si el usuario con el profile_id existe antes de eliminar los swipes
    const userExists = await ctx.orm.Profile.findOne({ where: { id: ctx.params.profile_id } });

    if (userExists) {
      // Elimina todos los swipes donde el perfil es el swiper_profile_id o swiped_profile_id
      await ctx.orm.Swipe.destroy({
        where: {
          [Op.or]: [
            { swiper_profile_id: ctx.params.profile_id },
            { swiped_profile_id: ctx.params.profile_id },
          ],
        },
      });

      ctx.status = 204; // 204 No Content indica una eliminación exitosa
      ctx.body = "Swipes deleted";
    } else {
      ctx.status = 404; // 404 No encontrado si el usuario no existe
      ctx.body = "Profile not found";
    }
  } catch (error) {
    ctx.body = { error: error.message };
    ctx.status = 400; // 400: Error en la solicitud
  }
});

// Exportar

module.exports = router;