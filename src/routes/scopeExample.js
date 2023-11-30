const Router = require('koa-router')
const authUtils = require('../lib/auth/jwt')

const router = new Router();

// Ejemplo de ruta protegida para token con scope user
router.get('/protecteduser', authUtils.isUser, async (ctx) => {
    ctx.body = {
        message: "Bienvenido a la ruta protegida con el scope user!", user: ctx.state.user
    }
});

// Ejemplo de ruta protegida para token con scope admin
router.get('/protectedadmin', authUtils.isAdmin, async (ctx) => {
    ctx.body = {
        message: "Bienvenido a la ruta protegida con el scope admin!", user: ctx.state.user
    }
});

module.exports = router;