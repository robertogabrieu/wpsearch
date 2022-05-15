const express = require("express")
const cors = require('cors')
const app = express()
const port = 4000
const defaultContentTypeMiddleware = require("./app/middlewares/default-content-type")
const authRoutes = require("./app/routes/auth")
const requestRoutes = require("./app/routes/request")

var corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(defaultContentTypeMiddleware);
app.use(express.json({inflate: true, strict: true }));
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get("/", async (req, res) => {
  res.send("Hello World!")
})

app.use(authRoutes);
app.use(requestRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 