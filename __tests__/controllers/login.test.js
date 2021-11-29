const loginTest = require('../../app/controllers/LoginController')
jest.mock('../../app/controllers/LoginController.js')

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
  res.type = jest.fn().mockReturnValue(res);
  return res;
};

describe("testing \'LoginController\' ", () => {

  test('should 200 and return correct value', async () => {
    let req = mockRequest();
    const res = mockResponse();

    await loginTest.login(req, res);

    expect(res.send).toHaveBeenCalledWith(200);
    expect(res.send.mock.calls.length).toBe(1);
  });

  test('should 404 and not return login ctx', async () => {
    let req = mockRequest();
    const res = mockResponse();

    await loginTest.login(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' });
  });

  test('should 200 and return correct value', async () => {
    let req = mockRequest();
    const res = mockResponse();

    await loginTest.logout(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.type).toBe('redirect');
  });

  test('should 404 and not return logout ctx', async () => {
    let req = mockRequest();
    const res = mockResponse();

    await loginTest.logout(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.type).not.toBe('redirect');
  });

});