module.exports = {
    service: process.env.COMMONDB_SERVICE_NAME,
    accountsBaseUrl: process.env.COMMONDB_ACCOUNTS_BASE_URL,
    apiBaseUrl: process.env.COMMONDB_API_BASE_URL,
    variant: "default",
    dummyLoggedInUserObject: {
      userID: 88861970,
      emailID: "sunny.rajkotiya@knolskape.com",
      roleID: 1,
      userDetailsAvailable: true,
      firstName: "Sunny",
      lastName: "Rajkotiya",
      country: "India",
      designation: "Team Lead",
      organizationName: "Accenture",
      gender: "Male",
      logoutType: "normal",
      aliasEmailID: "sunnyrajkotiya@mailinator.com",
      commonDBGroupStorylineAdditionalParams: {
        time: 60,
        additionalOptions: ["isTimerEnabled", "isFinalReportEnabled"],
        timestamp: "commodo"
      },
      userAdditionalDetails: {
        userId: 88861970,
        email: "sunny.rajkotiya@knolskape.com",
        firstName: "Sunny",
        lastName: "Rajkotiya",
        experienceLevel: "labore consectetur",
        industry: "Software",
        aliasEmailID: "sunnyrajkotiya@mailinator.com",
        userCategory: "",
        gender: "male",
        profilePicUrl: "https://secure.gravatar.com/avatar/4129a83e137b7a0f5189ac8b40ac9a16?size=256&default=identicon",
        age: "sunt in",
        country: "India",
        highestEducation: "BTECH",
        designation: "Team lead"
      },
      authProvider: "commondb",
      userLicenseID: +process.env.CMNDB_ULI_ID,
      status: "Ut aute dolore",
      commonDBGroupName: "et voluptate ad sint",
      commonDBGroupID: +process.env.CMNDB_GROUP_ID,
      storylineID: 1,
      languageID: null,
      profilePicUrl: "https://secure.gravatar.com/avatar/4129a83e137b7a0f5189ac8b40ac9a16?size=256&default=identicon",
      organization: {
        id: 1,
        name: "KNOLSKAPE",
        logo: "",
        skinId: 1,
        themeId: 1,
        lang: "en_US",
        freshDeskId: 1
      }
    },
    auth: {
      type: process.env.COMMONDB_AUTH_TYPE,
      checkMasterSession: process.env.COMMONDB_CHECK_MASTER_SESSION === true ||
        process.env.COMMONDB_CHECK_MASTER_SESSION === 'true',
      openIdConnectConfiguration: {
        clientId: process.env.COMMONDB_CLIENT_ID,
        clientSecret: process.env.COMMONDB_CLIENT_SECRET,
        defaultRedirectUrl: process.env.COMMONDB_DEFAULT_REDIRECT_URI,
        publicKey: "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDT55JFeE5gLbNjQpOCU5dmjQRkCztRcJ21hPYWZGjQHRuXnR+xxa02dz1B3MGxaCQYnY4zlJrV4ksU8HFPDwIqIUzJFabU4jCTnMyWHxCsABD631VezrEHGIqx/YwE/1UqdfzVymS0TzdYiHOBn22AFDPN\n+I75XmI1vycImsQQTwIDAQAB\n-----END PUBLIC KEY-----\n"
      },
      checkMasterSessionForApiLogin: process.env.CHECK_MASTER_SESSION_FOR_API_LOGIN === true || process.env.CHECK_MASTER_SESSION_FOR_API_LOGIN === 'true'
    },
    demostorylineid: 1,
    type: 1,
    isLocal: process.env.COMMONDB_LOCAL === "true", // true , false
    commondbEnv: process.env.COMMONDB_ENV, //  local, dev, staging, production
    session: {
      lifetime: process.env.SESSION_WEB_LIFETIME,
      cookieName: process.env.COOKIE_NAME,
      driver: "redis",
      redisConfiguration: {
        host: process.env.SESSION_REDIS_HOST,
        port: process.env.SESSION_REDIS_PORT,
        database: process.env.SESSION_REDIS_DATABASE,
        password: process.env.SESSION_REDIS_PASSWORD
      },
      fileConfiguration: {
        path: "sessions/"
      },
      cookieDomain: process.env.COOKIE_DOMAIN,
      cookieSecure: process.env.COOKIE_SECURE,
      cookieHttpOnly: process.env.COOKIE_HTTP_ONLY,
      sameSite:process.env.SAMESITE
    }
  };