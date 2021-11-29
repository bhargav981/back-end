const models = require('@models');
const user = require('@utils/User');
const _ = require('lodash');
const { extractSheets } = require("spreadsheet-to-json");
// https://docs.google.com/spreadsheets/d/e/2PACX-1vTqhx86GoQevGOhNTBOY4Gh4Bm2YFlLy8eQL3oUXIim6-PjttntdZvhb1Lcb_S_3A/pub?output=xlsx


//TO BE REFACTORED

const fetchAndSave = async (spreadsheetId, worksheet, dbModel, extraParams, condition) => {
  const existingLabels = await dbModel.findAll({
    raw: true,
    attributes: ['id', 'lang', 'key', 'value'],
    condition,
  });


  try {
    let bulkcreatedata = [], jsonVal;
    await extractSheets(
      {
        spreadsheetKey: spreadsheetId,
        credentials: JSON.parse(process.env.LABEL_SHEET_READER)
      },
      (err, data) => {
        jsonVal = data;
      }
    )

    for (const sheetData in jsonVal) {

      await jsonVal[sheetData].map(async mapping => {

        if (mapping && mapping["key"].substring(0, 5) === 'label') {

          const data = existingLabels.find(label => label.key == mapping["key"] && label.lang == mapping["lang"]);
          console.log("existing data to update ", data)
          if (data && data.value != mapping["value"]) {
            dbModel.update(
              { value: mapping["value"] },
              {
                where: {
                  key: mapping["key"],
                  id: data.id,
                },
              }
            );
          } else if (!data) {
            bulkcreatedata.push({
              ...extraParams,
              lang: mapping["lang"],
              key: mapping["key"],
              value: mapping["value"],
            })
          }
        }
      });
      // bulkcreate rows
      console.log('bulkcreatedata', bulkcreatedata.length)
      if (bulkcreatedata.length > 0) {
        console.log('Creating new rows')
        await dbModel.bulkCreate(bulkcreatedata)
      }
    }
  } catch (error) {
    if (error instanceof TypeError) {
      // ignoring as usually not in the required format
    } else {
      console.log(error);
    }
  }
};

class StringsController {
  async getLabels(ctx) {
    const labels = await this.getLabelsData(ctx);
    ctx.body = labels;
    return;
  }

  async getLabelsData(ctx) {

    const grp = await user.getGroup(ctx.loggedInUserObject.commonDBGroupID);
    // const defaultStrings = await this.getDefaultStrings (grp.lang);
    // const storylineStrings = await this.getStorylineStrings (grp.lang);

    const uliId = await user.getUserId(ctx);
    const defaultStrings = await this.getDefaultStrings(grp.lang);
    const storylineStrings = await this.getStorylineStrings(uliId, grp.lang);
    let strings = [...defaultStrings, ...storylineStrings];

    let labels = {};

    strings.map(string => {
      Object.assign(labels, {
        [string.key]: string.value,
      });
    });

    return labels;
  }

  async getLabelsDataForCmnDb(uliId) {
    const grpID = await user.getGroupId(uliId);
    const grp = await user.getGroup(grpID);
    const defaultStrings = await this.getDefaultStrings(grp.lang);
    const storylineStrings = await this.getStorylineStrings(uliId, grp.lang);
    let strings = [...defaultStrings, ...storylineStrings];

    let labels = {};

    strings.map(string => {
      Object.assign(labels, {
        [string.key]: string.value,
      });
    });

    return labels;
  }

  async getAllLabels(grp) {

    const lang = grp.lang;
    const defaultStrings = await this.getDefaultStrings(lang);
    const storylineStrings = await models.storyline_strings.findAll({
      raw: true,
      attributes: ['key', 'value'],
      where: {
        lang
      }
    });

    let strings = [...defaultStrings, ...storylineStrings];

    let labels = {};

    strings.map(string => {
      Object.assign(labels, {
        [string.key]: string.value,
      });
    });

    return labels;
  }

  async getDefaultStrings(lang) {
    const strings = await models.default_strings.findAll({
      raw: true,
      attributes: ['key', 'value'],
      where: {
        lang,
      }
    });
    return strings;
  }

  async getStorylineStrings(uliId, lang) {
    const storylineId = await user.getStorylineId(uliId);
    const strings = await models.storyline_strings.findAll({
      raw: true,
      attributes: ['key', 'value'],
      where: {
        storylineId,
        lang,
      },
    });
    return strings;
  }

  async syncContentFromSheetToDb(ctx) {
    const { storylineId } = ctx.query;
    const result_default = await fetchAndSave(
      '1pS1SpcDPH_lJzVWcEas9_sZwjWI9rmADVeCWyosRpi8',
      'default_strings',
      models.default_strings,
      {},
      {}
    );
    const result_storyline = await fetchAndSave(
      '1pS1SpcDPH_lJzVWcEas9_sZwjWI9rmADVeCWyosRpi8',
      'storyline_strings',
      models.storyline_strings,
      {
        storylineId,
      },
      {
        storylineId,
      }
    );
    ctx.body = 'Data sent for processing, check logs and DB for the progress';
  }
}

module.exports = new StringsController();
