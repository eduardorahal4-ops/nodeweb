const express = require("express");
const sequelize = require("./database/database");

const Hero = require("./models/Hero.js");
const Movie = require("./models/Movie.js");
const heroesRoutes = require("./routes/heroes.routes.js");
const app = express();

Hero.belongsToMany(Movie, {
    through: "HeroMovies"
})

Movie.belongsToMany(Hero, {
    through:"MoviesHero"
})
app.use("/heroes", heroesRoutes);
sequelize
    .sync()
    .then(()=> { 
        console.log("Banco de Dados sincronizado.")
    })
    .catch((error) => { 
        console.error("Erro a sincronizar o Banco", error)
    })
module.exports = app;