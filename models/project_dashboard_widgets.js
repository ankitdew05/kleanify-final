const mongoose = require("mongoose");
const project_dashboard_widgetsSchema = new mongoose.Schema({
  value: {
    type: Object,
    summary: Object,
    overdue: Object,
    issues: Object,
    features: Object,
    githubIssues: Object,
    taskDistribution: Object,
    schedule: Object,
    budgetDistribution: Object,
    weeklyExpenses: Object,
    monthlyExpenses: Object,
    yearlyExpenses: Object,
    budgetDetails: Object,
    teamMembers: Array,
  },
});
exports.Project_dashboard_widget = mongoose.model(
  "Project_dashboard_widget",
  project_dashboard_widgetsSchema
);
