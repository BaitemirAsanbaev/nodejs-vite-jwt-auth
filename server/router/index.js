const Router = require("express").Router
const router = new Router()
const userController = require("../controller/user-controller")
const authMiddleware = require("../middleware/auth-middleware")
const {body} = require("express-validator")



router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 4, max: 32}),
    userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)

module.exports = router
