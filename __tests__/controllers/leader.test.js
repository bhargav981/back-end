const leaderTest = require('../../app/controllers/LeaderBoardController')
jest.mock('../../app/controllers/LeaderBoardController.js')

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

describe("testing \'LeaderBoardController\' ", () => {

  test('should 200 and return context', async () => {
    let req = mockRequest();
    const res = mockResponse();

    await leaderTest.get(req, res);

    expect(res.send).toHaveBeenCalledWith(200);
    expect(res.send.mock.calls.length).toBe(1);
  });

  test('should 404 and not return context', async () => {
    let req = mockRequest();
    const res = mockResponse();

    await leaderTest.get(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' });
  });

});