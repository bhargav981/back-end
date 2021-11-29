const StorylineIntro = require("@repositories/StorylineIntro");

class AdditionalParams{
    getAdditionalParams(defaultTimer){
        return {
            supportedLanguages: [
              {
                id: '1',
                value: 'default',
                default: 'true',
              },
            ],
            additionalGroupParams: [
              {
                key: 'lang',
                description: 'Select a language',
                isForMetrics: false,
                type: 'combo',
                label: 'Language',
                values: ['en_US','tr'],
                default: 'en_US',
                enable: 'true',
              },
              {
                key: 'time',
                desctription: 'Input the time of the simulation in minutes',
                isForMetrics: 'false',
                type: 'textbox',
                label: 'Timer',
                placeholder: 'Eg: 30, 20, 45',
                default: defaultTimer/60,
                enable: 'true',
                validation: {
                  Regex: [
                    {
                      Regex: "^[1-9]\\d*$",
                      errorMessage: 'Please enter digits',
                    },
                  ],
                },
              },
              {
                key: 'additionalOptions',
                description: 'This is the additional option section, which has a checkbox and has two values.',
                isForMetrics: false,
                type: 'checkbox',
                label: 'Additional options',
                values: [
                  {
                    key: 'isTimerEnabled',
                    value: 'Enable Timer',
                    default: 'Checked',
                  },
                  {
                    key: 'isFeedbackEnabled',
                    value: 'Enable Feedback',
                    default: 'Unchecked',
                  },
                  {
                    key: 'isLeaderboardEnabled',
                    value: 'Enable LeaderBoard',
                    default: 'Checked',
                  },
                  {
                    key: 'isFinalReportEnabled',
                    value: 'Enable Final Report',
                    default: 'Checked',
                  }
                ],
                enable: 'true',
              },
            ],
          };
    }
}

module.exports = new AdditionalParams();
