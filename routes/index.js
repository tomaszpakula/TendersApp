const express = require("express");
const router = express.Router();
const { Tender, Offer } = require("../models");
const { Op } = require("sequelize");
router.get("/", (req, res) => {
  res.render("index", { page: "home" });
});

router.get("/tenders", async (req, res) => {
  try {
    const tenders = await Tender.findAll({
      where: {
        end: {
          [Op.gt]: new Date(),
        },
      },
    });
    res.render("currentTenders", { tenders, page: "current" });
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
          [Op.lt]: new Date(),
        },
      },
    });
    res.render("finishedTenders", { tenders, page: "finished" });
  } catch (err) {
    console.error("Could not load targets: ", err);
    res.status(500).send("Server Error");
  }
});

router.get("/tenders/add", async (req, res) => {
  res.render("addTender", { page: "add" });
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
  res.render("addTender", { message: "Added new tender", page: 'add' });
});

router.get("/tenders/:id", async (req, res) => {
  const { id } = req.params;
  const { created } = req.query;

  try {
    const tender = await Tender.findByPk(id);
    const offers = await Offer.findAll({
      where: {
        tenderId: id,
        offerValue: {
          [Op.lte]: tender.maxBudget,
        },
      },
      order: [["offerValue", "ASC"]],
    });
    const now = new Date();
    const isCurrent = tender.end > now;

    if (!tender) {
      return res.status(404).send("Tender not found");
    }
    res.render("tenderDetails", { tender, offers, isCurrent, created, page : 'tender' });
  } catch (err) {
    console.error("Error fetching tender:", err);
    res.status(500).send("Server Error");
  }
});

router.get("/tenders/offer/:id", async (req, res) => {
  const { id } = req.params;
  res.render("addOffer", { id, page: 'addOffer' });
});

router.post("/tenders/offer/:id", async (req, res) => {
  try {
    const { offerName, offerValue } = req.body;
    const { id } = req.params;
    await Offer.create({
      name: offerName,
      offerValue,
      tenderId: id,
    });
    res.redirect(`/tenders/${id}?created=${true}`);
  } catch (err) {
    console.error("Error create offer: ", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
