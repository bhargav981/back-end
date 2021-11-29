const Blockers = require("./../Blockers");

class GeneralBlockers extends Blockers {

	async checkBlocker(uliId, day, blocker) {
		return await this.saveAndGetBlockerDetails(uliId, day, blocker);
	}

}

module.exports = new GeneralBlockers();