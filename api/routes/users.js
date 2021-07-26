const express = require("express");
const { auth } = require("../utils/auth");
const { comparePassword, insertUser, getUserById, getByEmail, generateAuthToken } = require("../repositories/users");
const { isNewUserValid, isUserLoginValid } = require("../validators/user");

const router = express.Router();

router.post("/users", async (req, res) => {
  const newUser = req.body;

  if (!isNewUserValid(newUser))
    return res
      .status(400)
      .send({ message: "Por favor, preencha os dados corretamente." });

  const userAlreadyHasEmail = await getByEmail(newUser.email);
  if (userAlreadyHasEmail) {
    return res.status(400).send({ message: "Email já está em uso." });
  }

  try {
    const user = await insertUser(newUser);

    return res.status(201).send(user);
  } catch (e) {
    console.error(e);
    return res
      .status(400)
      .send({ message: "Ocorreu um erro, tente novamente mais tarde." });
  }
});

router.post("/auth", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!isUserLoginValid(email, password))
    return res.status(401).send({ error: "Unable to login" });

  try {
    const user = await getByEmail(email);
    if (!user) {
      return res.status(401).send({ error: "Unable to login" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: "Unable to login" });
    }

    const token = generateAuthToken(user.id);
    res.send({ user, token });
  } catch (e) {
    console.log("Error", e);
    res.sendStatus(400);
  }
});

router.get("/users", auth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).send();
    }
    
    res.send(user);
  } catch (e) {
    console.log("Error", e);
    return res.status(400).send();
  }
});

module.exports = router;