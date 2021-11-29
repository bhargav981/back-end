const user = require('@utils/User');
const models = require('@models');
const _ = require("lodash");

class Report {

    getAboutText(){
        return {
                simulation: {
                    title: 'label_report_about_sim_title',
                    imageDesc: 'label_report_about_sim_image_desc',
                    simDesc: 'label_report_about_sim_desc'
                },
                report: {
                    title: 'label_report_about_report_title',
                    reportDesc: [
                        'label_report_about_report_desc_1',
                        'label_report_about_report_desc_2',
                        'label_report_about_report_desc_3',
                        'label_report_about_report_desc_4',
                        'label_report_about_report_desc_5'
                    ]
                }
            }
        }    
}

module.exports = new Report();