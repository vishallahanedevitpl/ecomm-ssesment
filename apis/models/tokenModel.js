module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define(
    "token",
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
    }
  );
  return Token;
};
