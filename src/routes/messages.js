const Router = require('koa-router');
const router = new Router();
const authUtils = require('../lib/auth/jwt')


// Ruta post para crear un message
router.post("chats.create", "/", async (ctx) => {
  try {
    const { chat_id, sender, text, date } = ctx.request.body;
    // Revisamos si existe el chat 
    const chat = await ctx.orm.Chat.findByPk(chat_id);

    if (!chat) {
      ctx.status = 404;
      ctx.body = "Invalid chat_id";
      return;
    }

    const senderProfile = await ctx.orm.Profile.findByPk(sender);

    if (!senderProfile) {
      ctx.status = 404;
      ctx.body = "Invalid sender";
      return;
    }

    // Create the message with chat association
    const message = await ctx.orm.Message.create({
      chat_id,
      sender: parseInt(senderProfile.id, 10),
      text,
      date,
    });

    ctx.body = message;
    ctx.status = 201; // 201: Created successfully
  } catch (error) {
    ctx.body = error;
    ctx.status = 400; // 400: Bad Request for errors in the request
  }
});


// Ruta get para obtener todos los messages
router.get("messages.list", "/", async (ctx) => {
  try {
    const messages = await ctx.orm.Message.findAll();
    ctx.body = messages;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

//Ruta para obtener mensajes según chat_id
router.get("messages.listByChat", "/chat/:chatId", async (ctx) => {
  try {
    const chatId = ctx.params.chatId;
    // Revisa si el chat existe
    const chat = await ctx.orm.Chat.findByPk(chatId);
    if (!chat) {
      ctx.status = 404;
      ctx.body = "Chat not found";
      return;
    }
    // Si existe, obtiene sus mensajes
    const messages = await ctx.orm.Message.findAll({
      where: { chat_id: chatId },
    });
    ctx.body = messages;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
});


// Ruta para updatear un mensaje (eliminar?)
router.put("messages.update", "/:id", async (ctx) => {
  try {
    const message = await ctx.orm.Message.findOne({ where: { id: ctx.params.id } });
    if (message) {
      await message.update(ctx.request.body);
      ctx.body = message;
      ctx.status = 200;
    } else {
      ctx.body = "Message not found";
      ctx.status = 404; // No encontró al mensaje
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// Ruta delete para eliminar un message (solo lo puede hacer el administrador
router.delete("messages.delete", "/:id", authUtils.isAdmin, async (ctx) => {
  try {
    const message_id = ctx.params.id;
    // Check if the message exists
    const message = await ctx.orm.Message.findByPk(message_id);

    if (!message) {
      ctx.status = 404; // 404 Not Found if the message doesn't exist
      ctx.body = "Message not found";
      return;
    }

    // Delete the message
    await message.destroy();
    ctx.body = "Message deleted";
    ctx.status = 204; // 204 No Content indicates a successful delete
  } catch (error) {
    ctx.body = error;
    ctx.status = 500; // 500 Internal Server Error for other errors
  }
});

// Ruta para eliminar todos los mensajes de un mismo chat (solo lo puede hacer el administrador)
router.delete("messages.deleteByChat", "/chat/:chat_id", authUtils.isAdmin, async (ctx) => {
  try {
    const chat_id = ctx.params.chat_id;
    
    // Encontrar y eliminar todos los mensajes del chat
    const messages = await ctx.orm.Message.findAll({
      where: {
        chat_id: chat_id,
      },
    });

    for (const message of messages) {
      await message.destroy();
    }

    ctx.body = "All messages deleted";
    ctx.status = 204; // 204 No Content indicates a successful delete
  } catch (error) {
    ctx.body = error;
    ctx.status = 500; // 500 Internal Server Error for other errors
  }
});

// Exportar
module.exports = router;




