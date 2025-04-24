const express = require("express");
const router = express.Router();
const { Tender, Offer } = require("../models");
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/tenders", async (req, res) => {
  try {
    const tenders = await Tender.findAll({
      where: {
        end: {
          [require("sequelize").Op.gt]: new Date(),
        },
      },
    });
    res.render("currentTenders", { tenders });
  } catch (err) {
    console.error("Could not load targets: ", err);
    res.status(500).send("Server Error");
  }
});

router.get("/tenders/finished", async (req, res) => {
  try {
    const tenders = await Tender.findAll({
      where: {
        end: {
          [require("sequelize").Op.lt]: new Date(),
        },
      },
    });
    res.render("finishedTenders", { tenders });
  } catch (err) {
    console.error("Could not load targets: ", err);
    res.status(500).send("Server Error");
  }
});

router.get("/tenders/add", async (req, res) => {
  res.render("addTender");
});

router.post("/tenders/add", async (req, res) => {
  const { name, institution, description, start, end, maxBudget } = req.body;
  await Tender.create({
    name,
    institution,
    description,
    start: new Date(start),
    end: new Date(end),
    maxBudget,
  });
  res.render("addTender", { message: "Added new tender" });
});

router.get("/tenders/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tender = await Tender.findByPk(id);
    const offers = await Offer.findAll({
      where: {
        tenderId: id,
      },
    });

    if (!tender) {
      return res.status(404).send("Tender not found");
    }
    res.render("tenderDetails", { tender, offers });
  } catch (err) {
    console.error("Error fetching tender:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
