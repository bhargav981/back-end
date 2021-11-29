const healthTest = require('../../app/controllers/HealthController')
jest.mock('../../app/controllers/HealthController.js')

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

describe("testing \'HealthController\' ", () => {

    test('should 200 and return health status', async () => {
      let req = mockRequest();
      const res = mockResponse();
  
      await healthTest.checkHealth(req, res);
  
      expect(res.send).toHaveBeenCalledWith(200);
      expect(res.send.mock.calls.length).toBe(1);
    });

    test('should 404 and not return health status', async () => {
      let req = mockRequest();
      const res = mockResponse();
  
      await healthTest.checkHealth(req, res);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send.mock.calls.length).toBe(1);
      expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' });
    });
  
    test('should 200 and return report status', async () => {
      let req = mockRequest();
      const res = mockResponse();
  
      await healthTest.getReportStatus(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send.mock.calls.length).toBe(1);
    });

    test('should 404 and not return report status', async () => {
      let req = mockRequest();
      const res = mockResponse();
  
      await healthTest.getReportStatus(req, res);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send.mock.calls.length).toBe(1);
      expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' });
    });
});