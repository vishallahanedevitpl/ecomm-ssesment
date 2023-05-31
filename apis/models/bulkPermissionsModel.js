module.exports = (sequelize, DataTypes) => {
  const BulkPermission = sequelize.define(
    "bulkPermission",
    {
      permission: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
    }
  );

  return BulkPermission;
};
