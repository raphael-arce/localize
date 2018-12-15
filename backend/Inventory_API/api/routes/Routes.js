'use strict';
module.exports = function(app) {
  var erp = require('../controllers/Controller');

  // todoList Routes
  app.route('/products')
    .get(todoList.list_all_tasks)


  app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);
};
