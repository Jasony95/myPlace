// import models
const User = require('./User');
const Category = require('./Category');
const Place = require('./Place');
const Comment = require('./Comment');

// User belongsTo Comment-- user makes the comments
Comment.belongsTo(User, {
  foreignKey: "username"
});
// Categories have many Place ?? Not sure if this is correct
Category.hasMany(Place, {
  foreignKey: "category_name"
})
// Products belongToMany Tags (through ProductTag)
// Place.belongsToMany(Category, {
//   through: "product_tag"
// })
// Place belongToMany User (through ProductTag)
Place.belongsToMany(User, {
  through: "username"
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
