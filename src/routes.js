const Router = require('koa-router');
const profiles = require('./routes/profiles.js');
const users = require('./routes/users.js');
const locations = require('./routes/locations.js');
const authRoutes = require('./routes/authentication.js');
const jwtMiddleware = require('koa-jwt');
const scopeProtectedRoutes = require('./routes/scopeExample.js')
const dotenv = require('dotenv');
dotenv.config();


const chats = require('./routes/chats.js');
const messages = require('./routes/messages.js');
const swipes = require('./routes/swipes.js');
const matches = require('./routes/matches.js');

const router = new Router();

// Rutas no protegidas

// Rutas protegidas
router.use(authRoutes.routes());
router.use(jwtMiddleware({ secret: process.env.JWT_SECRET })); // Inicia protección con JWT
router.use("/users", users.routes());
router.use("/profiles", profiles.routes());
router.use("/locations", locations.routes());
router.use('/scope-example', scopeProtectedRoutes.routes())
router.use("/swipes", swipes.routes());
router.use("/chats", chats.routes());
router.use("/messages", messages.routes());
router.use("/matches", matches.routes());

module.exports = router;