const Router = require('koa-router');
const router = new Router();

// Ruta post para crear un profile
router.post("profiles.create", "/", async (ctx) => {
  try {

    const { user_id, location_id } = ctx.request.body;
    // Revisamos si existe el usuario y la ubicación
    const user = await ctx.orm.User.findByPk(user_id);
    const location = await ctx.orm.Location.findByPk(location_id);

    if (!user || !location) {
      ctx.status = 401;
      ctx.body = "Invalid user_id or location_id";
      return;
    }

    // Create the profile with user and location associations
    const profile = await ctx.orm.Profile.create({
      user_id,
      location_id,
    });

    ctx.body = profile;
    ctx.status = 201; // 201: Created successfully
  } catch (error) {
    ctx.body = error;
    ctx.status = 400; // 400: Bad Request for errors in the request
  }
});

// Ruta get para obtener todos los profiles
router.get("profiles.list", "/", async (ctx) => {
  try {
    const profiles = await ctx.orm.Profile.findAll();
    ctx.body = profiles;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// Ruta get para obtener profile según ID
router.get("profiles.show", "/:id", async (ctx) => {
  try {
    const profile = await ctx.orm.Profile.findOne({ where: { id: ctx.params.id } });
    if (profile) {
      ctx.body = profile;
      ctx.status = 200;
    } else {
      ctx.body = "Profile not found";
      ctx.status = 404; 
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// Ruta get para obtener todos los profiles de un mismo user (según ID user)
router.get("profiles.listByUser", "/user/:user_id", async (ctx) => {
  try {
    const user_id = ctx.params.user_id;
    // Revisa si el usuario existe
    const user = await ctx.orm.User.findByPk(user_id);
    if (!user) {
      ctx.status = 404; // 404 Not Found if the user doesn't exist
      ctx.body = "User not found";
      return;
    }

    // Si existe, obtiene sus perfiles
    const profiles = await ctx.orm.Profile.findAll({
      where: { user_id: user_id },
    });

    ctx.body = profiles;
    ctx.status = 200; // 200 OK if profiles are found
  } catch (error) {
    ctx.body = error;
    ctx.status = 500; // 500 Internal Server Error for other errors
  }
});


router.put("profiles.update", "/:id", async (ctx) => {
  try {
    const profile = await ctx.orm.Profile.findOne({ where: { id: ctx.params.id } });
    if (profile) {
      await profile.update(ctx.request.body);
      ctx.body = profile;
      ctx.status = 200;
    } else {
      ctx.body = "Profile not found";
      ctx.status = 404;// No encontró al perfil
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});


// Ruta delete para eliminar un profile
router.delete("profiles.delete", "/:id", async (ctx) => {
  try {
    const profile_id = ctx.params.id;
    // Check if the profile exists
    const profile = await ctx.orm.Profile.findByPk(profile_id);

    if (!profile) {
      ctx.status = 404; // 404 Not Found if the profile doesn't exist
      ctx.body = "Profile not found";
      return;
    }

    // Delete the profile
    await profile.destroy();

    ctx.status = 204; // 204 No Content indicates a successful delete
    ctx.body = "Profile deleted";
  } catch (error) {
    ctx.body = error;
    ctx.status = 500; // 500 Internal Server Error for other errors
  }
});

// Exportar
module.exports = router;