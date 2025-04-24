const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Offer = sequelize.define(
  "Offer",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    offerValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "offers",
    timestamps: true,
  }
);

module.exports = Offer;
