const Router = require('koa-router');
var jwt = require('jsonwebtoken');
const router = new Router();
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();


// Código recuperado del proyecto ejemplo del curso: https://github.com/IIC2513/guess-who-backend/blob/main/src/routes/authentication.js

// Register
router.post("authentication.signup", "/signup", async (ctx) => {
    const authInfo = ctx.request.body;
    let user = await ctx.orm.User.findOne({ where: { email: authInfo.email } })
    if (user) {
        ctx.body = `El usuario con el mail ingresado ya existe`;
        ctx.status = 400;
        return;
    }
    try {
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(authInfo.password, saltRounds);

        user = await ctx.orm.User.create({ // Datos de la request
            username: authInfo.username,
            password: hashPassword,
            email: authInfo.email,
            age: authInfo.age,
            bio: authInfo.bio,
            photo: authInfo.photo,
        })
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
        return;
    }
    ctx.body = { // Devolvemos el usuario y el mail creado
        username: user.username,
        email: user.email
    };
    ctx.status = 201;
})


// Login
router.post("authentication.login", "/login", async (ctx) => {
    let user;
    const authInfo = ctx.request.body
    try {
        user = await ctx.orm.User.findOne({where:{email:authInfo.email}});
    }
    catch(error) {
        ctx.body = error;
        ctx.status = 400;
        return;
    }
    if (!user) {
        ctx.body = `No se encontró un usuario con el mail indicado.`;
        ctx.status = 400;
        return;
    }
    const validPassword = await bcrypt.compare(authInfo.password, user.password);
    if (validPassword) {
        ctx.body = {
            username: user.username,
            email: user.email,
        };
        ctx.status = 200;
    } else {
        ctx.body = "Contraseña incorrecta";
        ctx.status = 400;
        return;
    }

// JWT
const expirationSeconds = 1 * 60 * 60 * 24; // Dura 1 día (tiempo en segundos)
const JWT_PRIVATE_KEY = process.env.JWT_SECRET;
var token = jwt.sign(
    { scope: ['user'] },
    JWT_PRIVATE_KEY,
    { subject: user.id.toString() },
    { expiresIn: expirationSeconds }
);
ctx.body = {
"access_token": token,
"token_type": "Bearer",
"expires_in": expirationSeconds,
}
ctx.status = 200;

})

// Admin Login
router.post("authentication.adminLogin", "/admin-login", async (ctx) => {
    const authInfo = ctx.request.body;
    const validPassword = await bcrypt.compare(authInfo.password, process.env.ADMIN_PASSWORD);
    if (validPassword) {
        const expirationSeconds = 1 * 60 * 60 * 24; // Dura 1 día (tiempo en segundos)
        const JWT_PRIVATE_KEY = process.env.JWT_SECRET;
        const token = jwt.sign(
            { scope: ['admin'] },
            JWT_PRIVATE_KEY,
            { subject: "admin" },
            { expiresIn: expirationSeconds }
        );
        ctx.body = {
            "access_token": token,
            "token_type": "Bearer",
            "expires_in": expirationSeconds,
        };
        ctx.status = 200;
    } else {
        ctx.body = "Contraseña incorrecta";
        ctx.status = 400;
        return;
    }
});

module.exports = router;