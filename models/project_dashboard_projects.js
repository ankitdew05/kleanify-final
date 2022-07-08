
const mongoose = require("mongoose");
const project_dashboard_projectsSchema = new mongoose.Schema({
  value: {
    type: Array,
  },
});
exports.Project_dashboard_project = mongoose.model(
  "Project_dashboard_project",
  project_dashboard_projectsSchema
);
