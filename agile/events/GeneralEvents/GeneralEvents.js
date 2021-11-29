const Events = require("./../Events");

class GeneralEvents extends Events {

	async checkEvent(ctx, event) {
		return await this.saveAndGetEventDetails(ctx, event);
	}

}

module.exports = new GeneralEvents();