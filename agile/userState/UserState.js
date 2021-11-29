const userStateRepo = require("@repositories/UserState");
const Sentry = require('@sentry/node');
const User = require('@utils/User');

class UserState {

    async updatePhaseId(ctx) {
        try {
            const uliId = await User.getUserId(ctx);
            const {
                phaseId
            } = ctx.request.body;

            const update = {
                currentPhaseId: phaseId
            };
            const condition = {
                uliId
            };

            await userStateRepo.updateField(update, condition);

            return {
                success: true
            };

        } catch (error) {
            Sentry.captureMessage("Current Phase id is not updated" + JSON.stringify(error));
            ctx.throw(400, {
                msg: '',
                error
            });
        }
    }

    async updateTimerValue(ctx){
        try{
        const uliId = User.getUserId(ctx);
        const {  timerValue  } = ctx.request.body;

        const update = { timerValue  };
        const condition = {  uliId     };

        await userStateRepo.updateField(update, condition);

        return {
            success: true
        };

    } catch (error) {
        Sentry.captureMessage("Timer is not updated" + JSON.stringify(error));
        ctx.throw(400, {
            msg: '',
            error
        });
    }  
    }
}

module.exports = new UserState();