const Router = require('koa-router');
const router = new Router();
const authUtils = require('../lib/auth/jwt')

// Ruta get para obtener todas las locations
router.get("locations.list", "/", async (ctx) => {
    try {
      const locations = await ctx.orm.Location.findAll();
      console.log('Locations:', locations);
      ctx.body = locations;
      ctx.status = 200;
    } catch (error) {
      console.log('Error:', error);
      ctx.body = error;
      ctx.status = 500;
    }
  });

// Ruta get para obtener una location según id
router.get("locations.show", "/:id", async (ctx) => {
    try {
      const locationId = ctx.params.id;
      const location = await ctx.orm.Location.findOne({ where: { id: locationId } });
  
      if (location) {
        ctx.body = location;
        ctx.status = 200; // 200 OK if the location is found
      } else {
        ctx.body = "Location not found";
        ctx.status = 404; // 404 Not Found if the location with the given ID doesn't exist
      }
    } catch (error) {
      ctx.body = error;
      ctx.status = 500; // 500 Internal Server Error for other errors
    }
  });

// Ruta post para crear una location (solo lo puede hacer el administrador)
router.post("locations.create", "/", authUtils.isAdmin, async (ctx) => {
    try {
      const location = await ctx.orm.Location.create(ctx.request.body);
      ctx.body = location;
      ctx.status = 201; // 201 Created for successful creation
    } catch (error) {
      ctx.body = error;
      ctx.status = 400; // 400 Bad Request for errors in the request
    }
  });

 // Ruta put para actualizar la información de una location (solo lo puede hacer el administrador)
 router.put("locations.update", "/:id", authUtils.isAdmin, async (ctx) => {
    try {
      const locationId = ctx.params.id;
      const location = await ctx.orm.Location.findOne({ where: { id: locationId } });
  
      if (location) {
        await location.update(ctx.request.body);
        ctx.body = location;
        ctx.status = 200; // 200 OK for successful update
      } else {
        ctx.body = "Location not found";
        ctx.status = 404; // 404 Not Found if the location with the given ID doesn't exist
      }
    } catch (error) {
      ctx.body = error;
      ctx.status = 400; // 400 Bad Request for errors in the request
    }
  });

  // Ruta delete para eliminar una location (solo lo puede hacer el administrador)
  router.delete("locations.delete", "/:id", authUtils.isAdmin, async (ctx) => {
    try {
      const location = await ctx.orm.Location.findOne({ where: { id: ctx.params.id } });
  
      if (location) {
        await location.destroy();
        ctx.status = 204; // 204 No Content indicates a successful delete
        ctx.body = "Location deleted";
      } else {
        ctx.body = "Location not found";
        ctx.status = 404; // 404 Not Found if the location with the given ID doesn't exist
      }
    } catch (error) {
      ctx.body = error;
      ctx.status = 400; // 400 Bad Request for errors in the request
    }
  });

  // Exportar
  module.exports = router;
 