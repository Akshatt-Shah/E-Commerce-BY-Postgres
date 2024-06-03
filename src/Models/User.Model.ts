import { DataTypes } from "sequelize";
import { sequelize } from "../db/connection";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    role: { type: DataTypes.ENUM, values: ["User", "Admin"], allowNull: false },
  },
  {
    timestamps: true,
  }
);
User.sync({ alter: true })
  .then(() => {
    console.log("User table created successfully.");
  })
  .catch((err) => {
    console.error("Error creating User table:", err);
  });

export { User };
