const Joi = require ('@hapi/joi');

module.exports = async function (ctx, next) {
  let req = ctx.req;
  let res = ctx.res;
  const {storylineId, lang} = ctx.query;

  const schema = Joi.object ().keys ({
    storylineId: Joi.number().integer().required()
  });

  const result = Joi.validate ({"storylineId": storylineId}, schema, (err, value) => {
    if (err) {
      ctx.throw (400, 'Invalid params (Format: sync-lables?storylineId=1)' );
    }
  });

  await next ();
};
