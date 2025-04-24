const sequelize = require("../db/db");
const Tender = require("./Tender");
const Offer = require("./Offer");

Tender.hasMany(Offer, { foreignKey: "tenderId" });
Offer.belongsTo(Tender, { foreignKey: "tenderId" });

module.exports = {
  sequelize,
  Tender,
  Offer,
};
