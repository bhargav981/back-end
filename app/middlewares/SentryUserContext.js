const Sentry = require ('@sentry/node');

module.exports = async function (ctx, next) {
  Sentry.configureScope (scope => {
    scope.setUser ({
      email: ctx.loggedInUserObject.emailID,
      uliId: ctx.loggedInUserObject.userLicenseID,
      groupId: ctx.loggedInUserObject.commonDBGroupID,
      env: process.env.COMMONDB_ENV,
    });
  });

  await next ();

};
