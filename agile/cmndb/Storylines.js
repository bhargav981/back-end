const additionalParams = require("@agile/cmndb/AdditionalParams");
const Storyline = require("@repositories/Storyline");

class Storylines{
  async getStorylines (ctx) {
    const {type} = ctx.query;

    const isDemo = type == 'normal' ? false : true;

    const sls = await Storyline.getAllStorylines(isDemo);

   return sls.map (sl => {
    const additionalGroupParams =  additionalParams.getAdditionalParams (sl.timerValue);

      return {
        stlId: sl.id,
        stlName: sl.name,
        type: sl.isDemo ? 'demo' : 'normal',
        stlDesc: 'Sample description',
        ...additionalGroupParams,
      };
    });
  }

  async getStorylineById (ctx) {
    if (ctx.query.id) {
      const {id} = ctx.query;
      const sl = await Storyline.getStorylineByStorylineId(id);
      const additionalGroupParams =  additionalParams.getAdditionalParams (sl[0].timerValue);

      return {
        stlId: sl[0].id,
        stlName: sl[0].name,
        type: sl[0].isDemo ? 'demo' : 'normal',
        stlDesc: 'Sample description',
        ...additionalGroupParams,
      };
    }
    return await this.getStorylines(ctx);
  }
}

module.exports = new Storylines();
