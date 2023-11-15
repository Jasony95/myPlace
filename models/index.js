// import models
const User = require('./User');
const Category = require('./Category');
const Place = require('./Place');
const Comment = require('./Comment');
const Marker = require('./Marker');

User.hasMany(Marker, {
  foreignKey: "user_id",
  onDelete: 'CASCADE'
})

Marker.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: 'CASCADE'
})

// NOT DONE!

// User belongsTo Comment-- user makes the comments
Comment.belongsTo(User, {
  foreignKey: "user_id"
});

// Categories have many Place ?? Not sure if this is correct
Place.belongsTo(Category, {
  foreignKey: "category_id"
})
// Products belongToMany Tags (through ProductTag)
// Place.belongsToMany(Category, {
//   through: "product_tag"
// })
// Place belongToMany User (through ProductTag)
Place.belongsTo(User, {
  foreignKey: "user_id"
});


module.exports = {
  User,
  Category,
  Place,
  Comment,
  Marker
};
