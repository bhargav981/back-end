const Prds = require('@repositories/Prds');
const utils = require('@utils/Utils');
const _ = require('lodash');

class MetricUtils {
  async getMeasuresImpact(actionOptionImpact, actionOptionIds, sprintNumer) {
    // console.log('measures impact');
    // console.log(actionOptionImpact, 'actionOptionImpact')
    let m = 0;
    let sum = 0;
    let totalWeightage = 0;

    if (actionOptionIds) {
      let vals = [];

      Object.keys(actionOptionIds).forEach(key => {
        // console.log('key')
        vals = actionOptionImpact.filter(function (ai) {
          return ai.actionOptionId == key;
        });

        // console.log(vals, 'vals')

        if (vals.length > 0) {
          const values = _.map(vals, 'value');
          if (values) {
            sum += this.sum(values, actionOptionIds[key]);
            totalWeightage += actionOptionIds[key];
          }
          console.log(actionOptionIds[key], 'we')
          console.log(totalWeightage, 'total weightage')
          // m += this.average(values, actionOptionIds[key],sprintNumer);
        }
      });
    }
    // return m;
    // console.log(sum,sprintNumer,totalWeightage)
    console.log(sum, totalWeightage, sprintNumer)
    if (sum) {
      m = (sum / sprintNumer) / totalWeightage;
    }
    console.log(m, 'm')
    console.log('----------------------------------------------------------')
    return m;
  }

  sum(arr, weightage) {
    let sum = arr.reduce((p, c) => p + c, 0);
    return sum * weightage;
  }

  average(arr, weightage, sprintNumer) {
    let sum = arr.reduce((p, c) => p + c, 0);
    return (sum * weightage) / sprintNumer;
  }

  getFinalCompScore(score, mean, sd) {
    const zScore = this.zscore(score, mean, sd);
    console.log(zScore, 'zsc')
    const stenScore = this.sten(zScore);
    return stenScore;
  }

  zscore(compScore, mean, sd) {
    const z = ((compScore - mean) / sd).toFixed(2);
    return z;
  }

  sten(zscore) {

    if (zscore < -2) {
      return 1;
    }

    if (zscore > 2) {
      return 10;
    }

    const stenConstants = [
      {
        key: -1.5,
        value: 2
      },
      {
        key: -1,
        value: 3
      },
      {
        key: -0.5,
        value: 4
      },
      {
        key: 0,
        value: 5
      },
      {
        key: 0.5,
        value: 6
      },
      {
        key: 1.0,
        value: 7
      },
      {
        key: 1.5,
        value: 8
      },
      {
        key: 2,
        value: 9
      }
    ];


    for (let i = 0; i < stenConstants.length; i++) {
      if (stenConstants[i].key >= zscore) {
        console.log(zscore, 'zscore', stenConstants[i].value, 'sten')
        return stenConstants[i].value
      }
    }


    // const stenConstants = {
    //   '-1.5': 2,
    //   '-1.0': 3,
    //   '-0.5': 4,
    //   '0': 5,
    //   '0.5': 6,
    //   '1.0': 7,
    //   '1.5': 8,
    //   '2.0': 9,
    // };

    // for (const key of Object.keys (stenConstants)) {
    //   console.log(key)

    //   // if (Number (key) > zscore) {
    //   //   return stenConstants[key];
    //   // }
    // }

    return 9;
  }

  async getFinalScore(uliId, metricUserData) {
    const lastSprint = metricUserData.length - 1;
    const totalScore = utils.convertToDecimal(metricUserData[lastSprint]);   //last sprint's score

    if (totalScore < 0) {
      return 0;
    } else if (totalScore > 10) {
      return 10;
    } else {
      return totalScore;
    }
  }

  getCompScoreGradeOnSten(score, competency) {
    switch (true) {
      case score >= 0 && score <= 2:
        return {
          grade: 'label_report_grade_novice',
          gradeDesc: 'label_grade_desc_' + competency + '_novice'
        };
      case score >= 3 && score <= 4:
        return {
          grade: 'label_report_grade_emerging',
          gradeDesc: 'label_grade_desc_' + competency + '_emerging'
        };
      case score >= 5 && score <= 6:
        return {
          grade: 'label_report_grade_competent',
          gradeDesc: 'label_grade_desc_' + competency + '_competent'
        };
      case score >= 7 && score <= 8:
        return {
          grade: 'label_report_grade_proficient',
          gradeDesc: 'label_grade_desc_' + competency + '_proficient'
        };
      case score >= 9 && score <= 10:
        return {
          grade: 'label_report_grade_role_model',
          gradeDesc: 'label_grade_desc_' + competency + '_role_model'
        };
      default:
        break;
    }
  }

  getCompScoreGrade(score, competency) {
    switch (true) {
      case score >= 0 && score <= 3.3:
        return {
          grade: 'label_low',
          insight: 'label_insight_text_' + competency + '_low',
          gradeDesc: 'label_grade_desc_' + competency + '_low',
        };
      case score > 3.3 && score <= 6.6:
        return {
          grade: 'label_medium',
          insight: 'label_insight_text_' + competency + '_medium',
          gradeDesc: 'label_grade_desc_' + competency + '_medium',
        };
      case score > 6.6 && score <= 10:
        return {
          grade: 'label_high',
          insight: 'label_insight_text_' + competency + '_high',
          gradeDesc: 'label_grade_desc_' + competency + '_high',
        };
      default:
        break;
    }
  }

  async getPrdScore(uliId, sprintNumber) {
    const userPrd = await Prds.getLatestUserPrd(uliId, sprintNumber);
    const t = this.getPrdTimeScore(userPrd.day);
    const l = this.getPrdLeveLScore(userPrd.prdId);

    return l * ((5 - t) / 4);
  }

  getPrdTimeScore(day) {
    switch (true) {
      case day === 1:
        return 1;
      case day >= 2 && day < 20:
        return 2;
      case day >= 21 && day < 36:
        return 3;
      case day >= 37 && day < 50:
        return 4;
      default:
        break;
    }
  }

  getPrdLeveLScore(level) {
    switch (level) {
      case 1:
        return 33;
      case 2:
        return 66;
      case 3:
        return 100;
      default:
        break;
    }
  }

  getGroupCompAvg(userCompetencyValues) {
    let sum = 0;

    if (userCompetencyValues.length) {
      for (let i = 0; i < userCompetencyValues.length; i++) {
        sum += userCompetencyValues[i].value;
      }

      return sum / userCompetencyValues.length;
    }

    return 0;

  }

  getGroupGradeAndDesc(score, metricName) {
    switch (true) {
      case score >= 0 && score <= 2:
        return {
          grade: 'label_report_grade_novice',
          insight: 'label_group_insight_novice_' + metricName
        };
      case score > 2 && score <= 4:
        return {
          grade: 'label_report_grade_emerging',
          insight: 'label_group_insight_emergent_' + metricName
        };
      case score > 4 && score <= 6:
        return {
          grade: 'label_report_grade_competent',
          insight: 'label_group_insight_competent_' + metricName
        };
      case score > 6 && score <= 8:
        return {
          grade: 'label_report_grade_proficient',
          insight: 'label_group_insight_proficient_' + metricName
        };
      case score > 8 && score <= 10:
        return {
          grade: 'label_report_grade_role_model',
          insight: 'label_group_insight_role_model_' + metricName
        };
      default:
        break;
    }
  }
}

module.exports = new MetricUtils();
