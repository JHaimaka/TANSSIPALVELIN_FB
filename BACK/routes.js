const express = require('express');
const router = express.Router();
const Dance = require('./models/dance');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Lisää tapahtuma POST
router.post("/Lisaa", verifyToken, async (req, res) => {
  const { danceEvent, danceGenre, dancePlace, startDate, startTime, endDate, endTime } = req.body;

  try {
    // Tarkista token
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        // Token on validi, lisää tapahtuma
        const newDance = new Dance({
          danceEvent,
          danceGenre,
          dancePlace,
          startDate,
          startTime,
          endDate,
          endTime,
        });

        const savedDance = await newDance.save();
        res.status(201).json({ message: 'Tapahtuma lisätty onnistuneesti.', dance: savedDance });
      }
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Funktio tokenin tarkistamiseksi
function verifyToken(req, res, next) {
  // Haetaan otsakkeista token
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    // Token on muotoa "Bearer <token>"
    const bearerToken = bearerHeader.split(' ')[1];
    // Lisätään token request-olioon
    req.token = bearerToken;
    // Jatketaan suoritusta
    next();
  } else {
    // Tokenia ei ole
    res.sendStatus(403);
  }
}

// Hae kaikki tapahtumat GET
router.get("/dances", async (req, res) => {
  try {
    const currentDate = new Date();
    const dances = await Dance.find({ startDate: { $gte: currentDate } }).sort({ startDate: 1 });
    res.send(dances);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});


// Hae kaikki käyttäjät GET
// jätetään tarkoituksella tietoturva-aukko /users -polku, joka tulostaa kannasta users-collectionin sisällön 
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Käyttäjän kirjautuminen POST
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tarkista onko käyttäjä olemassa
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Virheellinen sähköposti tai salasana.' });
    }

    // Tarkista salasana
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Virheellinen sähköposti tai salasana.' });
    }

    // Luo JWT token, voimassa 1 vuosi
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1y' });

    res.json({ token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Luo uusi käyttäjä POST
router.post("/luo", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tarkista onko käyttäjä olemassa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Käyttäjä on jo olemassa.' });
    }

    // Luo bcrypt hash salasanalle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Luo uusi käyttäjä
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Tallenna käyttäjä tietokantaan
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'Uusi käyttäjä luotu onnistuneesti.' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;