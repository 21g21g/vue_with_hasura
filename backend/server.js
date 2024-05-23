const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");
const cors=require("cors")
const app = express();
const port = 5000;

// Create a connection pool to PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: "postgres",
  database: 'postgres',
  password: 'postgrespassword',
  port: 5432, // Default PostgreSQL port
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
//the bottom code is used for the hasura console is run on localhost 8080 and my server is run on localhost 5000 to comminicate both i use it.
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:5173'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Query user from database
    const result = await pool.query(
      "SELECT * FROM user WHERE email = $1",
      [email]
    );
    const user = result.rows[0];
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send("Invalid password");
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, "secrete key", {
      expiresIn: "1hr",
    });

    res.status(200).json(token);
  } catch (error) {
    console.error("Login failed:", error.message);
    res.status(500).send("Internal server error");
  }
});

app.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    // Insert new user into database
    await pool.query(
      "INSERT INTO user(userName, email, password) VALUES ($1, $2, $3)",
      [userName, email, encryptedPassword]
    );

    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Registration failed:", error.message);
    res.status(500).send("Internal server error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});