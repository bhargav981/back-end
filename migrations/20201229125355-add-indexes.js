'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return Promise.all([
            queryInterface.addIndex("user_action_options", ["uli_id"]),
            queryInterface.addIndex("user_action_options", ["uli_id", "action_option_id"]),
            queryInterface.addIndex("user_action_option_metrics", ["user_action_option_id"]),
            queryInterface.addIndex("user_action_option_metrics", ["user_action_option_id", "user_metrics_id"]),
            queryInterface.addIndex("user_competency_values", ["uli_id"]),
            queryInterface.addIndex("user_competency_values", ["uli_id", "metric_id"]),
            queryInterface.addIndex("user_customers", ["uli_id"]),
            queryInterface.addIndex("user_events", ["uli_id"]),
            queryInterface.addIndex("user_events", ["uli_id", "event_id"]),
            queryInterface.addIndex("user_events_metrics", ["user_event_id"]),
            queryInterface.addIndex("user_events_metrics", ["user_metrics_id"]),
            queryInterface.addIndex("user_events_metrics", ["user_event_id", "user_metrics_id"]),
            queryInterface.addIndex("user_metrics", ["uli_id"]),
            queryInterface.addIndex("user_metrics", ["uli_id", "metrics_id"]),
            queryInterface.addIndex("user_prds", ["uli_id"]),
            queryInterface.addIndex("user_prds", ["uli_id", "prd_id"]),
            queryInterface.addIndex("user_sprints", ["uli_id"]),
            queryInterface.addIndex("user_stories", ["uli_id"]),
            queryInterface.addIndex("user_stories", ["uli_id", "story_id"]),
            queryInterface.addIndex("user_stories_blockers", ["uli_id"]),
            queryInterface.addIndex("user_stories_blockers", ["uli_id", "story_id"]),
            queryInterface.addIndex("users", ["group_id"]),
            queryInterface.addIndex("user_team_members", ["uli_id"]),
            queryInterface.addIndex("user_team_members", ["uli_id", "team_member_id"]),
        ]);
    },

    down: (queryInterface, Sequelize) => {
    }
};