const repconTest = require('../../app/controllers/ReportController')
jest.mock('../../app/controllers/ReportController.js')

const mockRequest = () => {
  const req = {};
  req.body = jest.fn().mockReturnValue(req);
  req.params = jest.fn().mockReturnValue(req);
  return req;
}

const mockResponse = () => {
  const res = {};
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("testing \'ReportController\' ", () => {
    test('should 200 and return report url', async () => {
      let req = mockRequest();
      req.params.uliId = 263;
      const res = mockResponse();
  
      await repconTest.getUserReportPdf(req, res);
  
      expect(res.send.mock.calls.length).toBe(1);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  
    test('should 404 and return not found', async () => {
      let req = mockRequest();
      req.params.taskId = null;
      const res = mockResponse();
  
      await repconTest.getUserReportPdf(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' });
    });

    test('should 200 and return batch report url', async () => {
      let req = mockRequest();
      const res = mockResponse();
  
      await repconTest.getBatchReportPdf(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
    });
    
    test('should 404 and return not found', async () => {
      let req = mockRequest();
      req.params.taskId = null;
      const res = mockResponse();
  
      await repconTest.getBatchReportPdf(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' });
    });
});