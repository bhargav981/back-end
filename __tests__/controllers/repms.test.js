const repmsTest = require('../../app/controllers/ReportServiceController')
jest.mock('../../app/controllers/ReportServiceController')

const mockRequest = () => {
  const req = {};
  req.body = jest.fn().mockReturnValue(req);
  req.params = jest.fn().mockReturnValue(req);
  return req;
}

const mockResponse = () => {
  const res = {};
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockResolvedValueOnce(res);
  res.taskId = jest.fn().mockReturnValue(res);
  res.reportLink = jest.fn().mockReturnValue(res);
  return res;
};

const log = console.log;
//const message = console.log.mock.calls[0][0];
beforeEach(() => {
  jest.clearAllMocks();
  console.log = jest.fn();
});

afterAll(() => {
  console.log = log; // restore original console.log after all tests
});

describe("testing \'ReportServiceController\' ", () => {    

  test(' report_html should 200 and return correct', async () => {    

    let req = mockRequest();
    const res = mockResponse();
    await repmsTest.getReportHtml(req, res);

    expect(res.status).toBe(200);
    expect(res.send.mock.calls.length).toBe(1);
  });

  test(' getTaskId should 200 and return correct value', async () => {
    
    let req = mockRequest();
    const res = mockResponse();
    req.params.uliId = 263;

    await repmsTest.getTaskId(req, res);

    expect(res.send).toBe(200)
    expect(res.status).toBeTruthy();
  });

  test('get taskId should 404 and return correct value', async () => {

    let req = mockRequest();
    const res = mockResponse();
    req.params.uliId = null;

    await repmsTest.getTaskId(req, res);

    expect(res.status).toBe(404);
  });


  test('pollreport should 200 and return correct status', async () => {

    let req = mockRequest();
    const res = mockResponse();
    
    req.params.taskId = 1;
    jest.setTimeout(30000);

    await repmsTest.pollReportUrl(req, res);

    expect(res.status).toBe("COMPLETED");
    expect(res.reportLink).toBeDefined();
  });

  test('pollreport should fail and return correct value', async () => {

    let req = mockRequest();
    const res = mockResponse();
    req.params.taskId = null;

    await repmsTest.pollReportUrl(req, res);

    expect(console.log).toHaveBeenCalledWith("TaskID not found");
  });

});