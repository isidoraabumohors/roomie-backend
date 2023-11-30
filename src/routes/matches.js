const Router = require('koa-router');
const router = new Router();
const { Op } = require('sequelize');

// Ruta post para crear un match
router.post("matches.create", "/", async (ctx) => {
  try {
    const match = await ctx.orm.Match.create(ctx.request.body);
    ctx.body = match; // Devuelve el match creado
    ctx.status = 201; // 201: Crea exitosamente el match
  } catch (error) {
    ctx.body = error;
    ctx.status = 400; // 400: Error en la solicitud (Sequelize Validation Error)
  }
});

// Ruta get para obtener todos los matches
router.get("matches.list", "/", async (ctx) => {
  try {
    const matches = await ctx.orm.Match.findAll();
    ctx.body = matches;
    ctx.status = 200; // 200: Exitoso, muestra todos los matches
  } catch (error) {
    ctx.body = error;
    ctx.status = 400; // 400: Error en la solicitud
  }
});

// Ruta get para obtener matches según profile_id
router.get("matches.listByProfile", "/profile/:profile_id", async (ctx) => {
    try {
      const matches = await ctx.orm.Match.findAll({
        where: {
          [Op.or]: [
            { profile_A_id: ctx.params.profile_id },
            { profile_B_id: ctx.params.profile_id },
          ],
        },
      });
  
      ctx.body = matches;
      ctx.status = 200; // 200: Exitoso, muestra los swipes según profile_id
    } catch (error) {
      ctx.body = { error: error.message };
      ctx.status = 400; // 400: Error en la solicitud
    }
  });

// Ruta get para obtener match según ID
router.get("matches.show", "/:id", async (ctx) => {
  try {
    const matches = await ctx.orm.Match.findOne({ where: { id: ctx.params.id } });
    if (matches) {
      ctx.body = matches;
      ctx.status = 200; // 200: Exitoso encontro el usuario
    } else {
      ctx.body = "Match not found";
      ctx.status = 404; //Si no lo encuentra: BAD REQUEST
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400; // 4000: Error en la solicitud
  }
});



// Ruta put para actualizar la información de un match
router.put("matches.update", "/:id", async (ctx) => {
  try {
    const match = await ctx.orm.Match.findOne({ where: { id: ctx.params.id } });
    if (match) {
      await match.update(ctx.request.body);
      ctx.body = match;
      ctx.status = 200;
    } else {
      ctx.body = "Match not found";
      ctx.status = 404; // No encontró al swipe
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});


// Ruta delete para eliminar un match según ID
router.delete("matches.delete", "/:id", async (ctx) => {
  try {
    const match = await ctx.orm.Match.findOne({ where: { id: ctx.params.id } });
    if (match) {
      await match.destroy();
      ctx.status = 204; // 204 No Content indicates a successful delete
      ctx.body = "Match deleted";
    } else {
      ctx.body = "Match not found";
      ctx.status = 404; // Error en la solicitud (no se encontró el match - Bad Request)
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// Ruta para eliminar todos los matches de un perfil
router.delete("matches.deleteByProfile", "/profile/:profile_id", async (ctx) => {
  try {
    // Verificar si el perfil existe antes de eliminar los matches
    const profileExists = await ctx.orm.Profile.findOne({
      where: { id: ctx.params.profile_id },
    });

    if (!profileExists) {
      ctx.status = 404; // 404 No encontrado si el perfil no existe
      ctx.body = "Profile not found";
      return;
    }

    // Eliminar todos los matches donde el perfil es el swiper_profile_id o swiped_profile_id
    await ctx.orm.Match.destroy({
      where: {
        [Op.or]: [
          { profile_A_id: ctx.params.profile_id },
          { profile_B_id: ctx.params.profile_id },
        ],
      },
    });

    ctx.status = 204; // 204 No Content indica una eliminación exitosa
    ctx.body = "Matches deleted";
  } catch (error) {
    ctx.body = { error: error.message };
    ctx.status = 400; // 400: Error en la solicitud
  }
});

// Exportar

module.exports = router;