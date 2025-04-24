const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Tender = sequelize.define(
  "Tender",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    institution: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    maxBudget: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "tenders",
    timestamps: false,
  }
);

module.exports = Tender;
