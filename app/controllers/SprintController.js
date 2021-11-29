const _ = require("lodash");
const user = require('@utils/User');
const utils = require("@utils/Utils");
const models = require("@models");
const Sequelize = require("sequelize");
const UserState = require("@repositories/UserState");
const Stories = require("@repositories/Stories");

const SprintManager = require("@agile/sprint/SprintManager");

class SprintController {

	async startSprint(ctx) {

		const data = await SprintManager.startSprint(ctx);
		ctx.body = data;
	}

	async addSprintStories(ctx) {

		const data = await SprintManager.addSprintStories(ctx);
		ctx.body = data;
	}

	async addPriorityForTasks(ctx) {

		const data = await SprintManager.addPriorityForTasks(ctx);
		ctx.body = data;
	}

	async endSprint(ctx) {

		const data = await SprintManager.endSprint(ctx);
		ctx.body = data;

	}

	async replanSprint(ctx) {

		const data = await SprintManager.replanSprint(ctx);
		ctx.body = data;

	}
}

module.exports = new SprintController();