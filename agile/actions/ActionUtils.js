const user = require("@utils/User");
const actions = require("@repositories/Actions");
const MetricsRepository = require('@repositories/Metrics');

class ActionUtils {

    async checkIfActionCanBeTaken(uliId, actionOptionId, sprintNumber, day) {
        const actionOption = await actions.getActionOption(actionOptionId);
        const action = await actions.getAction(actionOption.actionId);
        const isGameLimitAvailable = this.checkIfGameLimitAvailable(action, actionOption, uliId);
        const isSprintLimitAvailable = this.checkIfSprintLimitAvailable(action, actionOption, uliId, sprintNumber, day);
        // check if budget is available.
        const isBudgetAvailable = this.checkIfbudgetIsAvailable(actionOption, uliId);
        //check for both game limit and sprint limit
        //return true;
        return (await isGameLimitAvailable && await isSprintLimitAvailable && await isBudgetAvailable);
    }

    async checkIfbudgetIsAvailable(actionOption, uliId) {
        const budget = await MetricsRepository.getLastUserMetric(uliId, 'budget')
        if (actionOption.cost <= budget.value) {
            return true;
        }
        return false;
    }
    async checkIfGameLimitAvailable(action, actionOption, uliId) {
        let gameLimit = actionOption.gameLimit;
        if (gameLimit == null) {
            gameLimit = action.gameLimit;
        }

        //checking the final game limit value
        if (gameLimit == null) {
            return true;
        }
        const userActionOptions = await actions.getUserActionOptionsCount(uliId, actionOption.id);

        //check if user options length is less than the game limit
        return userActionOptions < gameLimit;
    }

    async checkIfSprintLimitAvailable(action, actionOption, uliId, sprintNumber, day) {

        let sprintLimit = actionOption.sprintLimit;
        if (sprintLimit == null) {
            sprintLimit = action.sprintLimit;
        }

        if (sprintLimit == null) {
            return true;
        }

        const userActionOptionsSprint = await actions.getSprintUserActionOptions(uliId, actionOption.id, sprintNumber);
        //check if user options length is less than the sprint limit

        return userActionOptionsSprint.length < sprintLimit;
    }

    async checkIfMetricPositive() {}

    async getUserActionOptionsLength(uliId, actionId, type, sprintNumber, transaction) {
        const data = await actions.getUserActionOptionsForMessage(uliId, actionId,type, sprintNumber, transaction);
        return (data) ? data.length  : 0;
    }

    async getPoolMessage(actionOptionId) {
        const pool = await actions.getRandomPoolMessage(actionOptionId);
        return pool ? pool.message : null;
    }

    async getLevelMessage(uliId, actionId, type, sprintNumber, transaction) {

        //gets the message level to be displayed
        let levelToBeDisplayed = await this.getUserActionOptionsLength(uliId, actionId,type,sprintNumber, transaction)+1;
        const allLevelData = await actions.getLevelMessages(actionId);
        const totalLevels = allLevelData.length;

        //if all the level messages are already displayed, we show the last level message from then on
        if (levelToBeDisplayed > totalLevels) {
            levelToBeDisplayed = totalLevels;
        }

        const currentLevel = allLevelData.find(levelData => levelData.actionId === actionId && levelData.level === levelToBeDisplayed);

        return currentLevel ? currentLevel.message : null;
    }
}

module.exports = new ActionUtils();