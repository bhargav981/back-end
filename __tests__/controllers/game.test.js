const gameTest = require('../../app/controllers/GameController')
jest.mock('../../app/controllers/GameController.js')

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

describe("testing \'GameController\' ", () => {

    test('should 200 and return gameStarted ctx', async () => {
      let req = mockRequest();
      const res = mockResponse();
  
      await gameTest.gameStarted(req, res);
  
      expect(res.send).toHaveBeenCalledWith(200);
      expect(res.send.mock.calls.length).toBe(1);
    });
  
    test('should 404 and not return gameStarted ctx', async () => {
      let req = mockRequest();
      const res = mockResponse();
  
      await gameTest.gameStarted(req, res);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send.mock.calls.length).toBe(1);
      expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' });
    });

    test('should 200 and return gameCompleted ctx', async () => {
      let req = mockRequest();
      const res = mockResponse();
  
      await gameTest.gameCompleted(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send.mock.calls.length).toBe(1);
    });

    test('should 404 and not return gameCompleted ctx', async () => {
      let req = mockRequest();
      const res = mockResponse();
  
      await gameTest.gameCompleted(req, res);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send.mock.calls.length).toBe(1);
      expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' });
    });
});