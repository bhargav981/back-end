const sprTest = require('../../app/controllers/SprintController')
jest.mock('../../app/controllers/SprintController.js')

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

describe("testing \'SprintController\' ", () => {

    test('should 200 and return start sprint context', async () => {
      let req = mockRequest();
      const res = mockResponse();
  
      await sprTest.startSprint(req, res);
  
      expect(res.send).toHaveBeenCalledWith(200);
      expect(res.send.mock.calls.length).toBe(1);
    });

    test('should 404 and return correct value', async () => {
      let req = mockRequest();
      req.params.uliId = null;
      const res = mockResponse();
  
      await sprTest.startSprint(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send.mock.calls.length).toBe(1);
      expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' });
    });
  
    test('should 200 and return add sprint context', async () => {
      let req = mockRequest();
      const res = mockResponse();
  
      await sprTest.addSprintStories(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
    });

    test('should 404 and return correct value', async () => {
      let req = mockRequest();
      req.params.uliId = null;
      const res = mockResponse();
  
      await sprTest.addSprintStories(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' });
    });
});