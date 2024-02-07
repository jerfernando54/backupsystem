const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  page: { type: Object, require: true }
})

const PageModel = mongoose.model('Page', pageSchema);

module.exports = PageModel;