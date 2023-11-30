const Router = require('koa-router');
const router = new Router();

// Ruta post para crear un chat
router.post("chats.create", "/", async (ctx) => {
    try {
      const {match_id} = ctx.request.body;
      // Revisamos si existe el match 
      const match = await ctx.orm.Match.findByPk(match_id);
  
      if (!match) {
        ctx.status = 404;
        ctx.body = "Invalid match_id";
        return;
      }
      // Create the chat with match association
      const chat = await ctx.orm.Chat.create({
        match_id,
      });
  
      ctx.body = chat;
      ctx.status = 201; // 201: Created successfully
    } catch (error) {
      ctx.body = error;
      ctx.status = 400; // 400: Bad Request for errors in the request
    }
  });

// Ruta get para obtener todos los chats
router.get("chats.list", "/", async (ctx) => {
  try {
    const chats = await ctx.orm.Chat.findAll();
    ctx.body = chats;
    ctx.status = 200; // 200: Exitoso, muestra todos los chats
  } catch (error) {
    ctx.body = error;
    ctx.status = 400; // 400: Error en la solicitud
  }
});


// Ruta get para obtener el chat según ID del match
router.get("chats.getByMatch", "/matches/:match_id", async (ctx) => {
  try {
    const chat = await ctx.orm.Chat.findOne({
      where: {
        match_id: ctx.params.match_id,
      },
    });

    if (chat) {
      ctx.body = chat;
      ctx.status = 200; // 200: Exitoso
    } else {
      ctx.body = "Chat not found for given match_id";
      ctx.status = 404; // 404: No encontrado
    }
  } catch (error) {
    ctx.body = { error: error.message };
    ctx.status = 400; // 400: Error en la solicitud
  }
});




// Ruta get para obtener chat según ID
router.get("chats.show", "/:id", async (ctx) => {
  try {
    const chat = await ctx.orm.Chat.findOne({ where: { id: ctx.params.id } });
    if (chat) {
      ctx.body = chat;
      ctx.status = 200; // 200: Exitoso encontro el chat
    } else {
      ctx.body = "Chat not found";
      ctx.status = 404; //Si no lo encuentra: BAD REQUEST
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400; // 4000: Error en la solicitud
  }
});

// Ruta put para actualizar la información de un chat
router.put("chats.update", "/:id", async (ctx) => {
  try {
    const chat = await ctx.orm.Chat.findOne({ where: { id: ctx.params.id } });
    if (chat) {
      await chat.update(ctx.request.body);
      ctx.body = chat;
      ctx.status = 200;
    } else {
      ctx.body = "Chat not found";
      ctx.status = 404; // No encontró al chat
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// Ruta delete para eliminar un chat
router.delete("chats.delete", "/:id", async (ctx) => {
  try {
    const chat = await ctx.orm.Chat.findOne({ where: { id: ctx.params.id } });
    if (chat) {
      await chat.destroy();
      ctx.status = 204; // 204 No Content indicates a successful delete
      ctx.body = "Chat deleted";
    } else {
      ctx.body = "Chat not found";
      ctx.status = 404; // Error en la solicitud (asociado a un perfil, no se encontró el usuario - Bad Request)
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// Exportar

module.exports = router;