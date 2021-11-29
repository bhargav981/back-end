const repmsTest = require('../../app/controllers/ReportServiceController');

jest.mock('../../app/controllers/ReportServiceController')

const mockRequest = () => {
  const req = {};
  req.body = jest.fn().mockReturnValue(req);
  req.params = jest.fn().mockReturnValue(req);
  return req;
}

const mockResponse = () => {
  const res = {};
  return res;
};

jest.mock('../../models/user_report.js', () => {
  const SequelizeMock = require("sequelize-mock");
  const dbMock = new SequelizeMock();
  return dbMock.define('user_reports',  {
    id: 2,
    uliId: 263,
    reportUrl: 'good'
  })
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('saveReportUrl', () => {

  test('should save report_url to user_report', async () => {
    let req = mockRequest();
    const res = mockResponse();
    req.params.reportUrl = 'good';
    req.params.uliId = 263;

    await repmsTest.saveReportUrl(req, res)
    .then(user_report => {
        expect(user_report.reportUrl).toEqual('good');
    })
  });
  
});