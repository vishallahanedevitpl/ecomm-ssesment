module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define(
    "role",
    {
      roleName: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
      },
      permissions: {
        type: DataTypes.JSON,
        defaultValue: "[]",
      },
    },
    {
      paranoid: true,
    }
  );

  return Roles;
};
