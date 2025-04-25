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
    tenderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tenders",
        key: "id",
      },
    },
  },
  {
    tableName: "offers",
    timestamps: true,
  }
);

module.exports = Offer;
