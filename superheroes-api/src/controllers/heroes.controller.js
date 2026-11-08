const { UPDATE } = require("sequelize/lib/query-types");
const Hero = require("../models/Hero.js");

async function list(req, res) {
    const movies = await Hero.findAll();
    return res.status(200).json(movies);
}

async function create(req, res) {

    const {name, universe, power} = req.body;

    if (!name || !universe || !power) {
        return res.status(400).json({
            message: "Nome, universo e poder são obrigatórios"
        });
    }

    const hero = await Hero.create({name, universe, power});
    return res.status(201).json(hero);
    
}

const update = async (req, res) => {
  try {
    const { id } = req.params;
    

    const hero = await Hero.findByPk(id);


    if (!hero) {
      return res.status(404).json({ error: "Herói não encontrado" });
    }


    await hero.update(req.body);


    return res.status(200).json(hero);
  } catch (error) {

    return res.status(500).json({ error: "Erro ao atualizar herói" });
  }
};


const replace = async (req, res) => {
  try {
    const { id } = req.params;
    

    const hero = await Hero.findByPk(id);


    if (!hero) {
      return res.status(404).json({ error: "Herói não encontrado" });
    }
    await hero.update({
      name: req.body.name || null,
      power: req.body.power || null,
      universe: req.body.universe || null
    });
    return res.status(200).json(hero);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao substituir dados do herói" });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const hero = await Hero.findByPk(id);


    if (!hero) {
      return res.status(404).json({ error: "Herói não encontrado" });
    }


    await hero.destroy();


    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Erro ao deletar herói" });
  }
};




module.exports = {
    list,
    create,
    update,
    replace,
    remove
};