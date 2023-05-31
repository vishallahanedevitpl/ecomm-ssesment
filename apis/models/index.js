const { Sequelize, DataTypes } = require("sequelize");

const dbConfig = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "da_ecomm",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("DB Connected...");
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.roles = require("./roleModel")(sequelize, DataTypes);

db.users = require("./userModel")(sequelize, DataTypes);
db.roles.hasMany(db.users);
db.users.belongsTo(db.roles);

db.tokens = require("./tokenModel")(sequelize, DataTypes);
db.users.hasOne(db.tokens);
db.tokens.belongsTo(db.users);

db.categories = require("./categoryModel")(sequelize, DataTypes);

db.subCategories = require("./subCategoryModel")(sequelize, DataTypes);
db.categories.hasMany(db.subCategories);
db.subCategories.belongsTo(db.categories);

db.products = require("./productModel")(sequelize, DataTypes);
db.productColors = require("./productColorModel")(sequelize, DataTypes);
db.productImages = require("./productImageModel")(sequelize, DataTypes);
db.productSizes = require("./productSizeModel")(sequelize, DataTypes);
db.productVariants = require("./productVariantModel")(sequelize, DataTypes);

db.categories.hasMany(db.products);
db.products.belongsTo(db.categories);
db.subCategories.hasMany(db.products);
db.products.belongsTo(db.subCategories);

db.users.hasMany(db.products);
db.products.belongsTo(db.users);

db.products.hasMany(db.productColors);
db.productColors.belongsTo(db.products);
db.products.hasMany(db.productSizes);
db.productSizes.belongsTo(db.products);

db.productVariants.belongsTo(db.products);
db.products.hasMany(db.productVariants);

db.productVariants.belongsTo(db.productColors);
db.productColors.hasMany(db.productVariants);

db.productVariants.belongsTo(db.productSizes);
db.productSizes.hasMany(db.productVariants);

db.productVariants.hasMany(db.productImages);
db.productImages.belongsTo(db.productVariants);

db.bulkPermissions = require("./bulkPermissionsModel")(sequelize, DataTypes);

db.sequelize.sync().then(() => {
  console.log("DB tables synced");
});

module.exports = db;
