// import models
const User = require('./User');
const Category = require('./Category');
const Place = require('./Place');
const Comment = require('./Comment');



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

Category.hasMany(Place, {
  foreignKey: "place_id"
});

User.hasMany(Place, {
  foreignKey: "place_id"
})


module.exports = {
  User,
  Category,
  Place,
  Comment,
};
