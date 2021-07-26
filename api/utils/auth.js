
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getByEmail } = require("../repositories/users");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log({ token });
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "HeRmiONeGrangErBeTTerTHENHaRRyPoTteR"
    );
    const user = await getByEmail(decoded.id);

    if (user && user.deleted_at === null) {
      req.user = user;
    }

    next();
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: "Please authenticate!" });
  }
};

const bcryptPassword = async (password) =>
  await bcrypt.hash(password, await bcrypt.genSalt());


module.exports = {
  bcryptPassword,
  auth
};