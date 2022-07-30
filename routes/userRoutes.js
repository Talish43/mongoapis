const experss = require("express");
const { register, login} = require("../controllers/usersController");
const { registerValidations, loginValidations } = require("../validations/userValidations");
const router = experss.Router();

router.post("/register",registerValidations, register);
router.post("/login",loginValidations, login);

module.exports = router;