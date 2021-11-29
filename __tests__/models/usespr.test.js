const sprMan = require('../../agile/sprint/SprintManager');
const user_sprints = require('../../models/user_sprints');

jest.mock('../../agile/sprint/SprintManager')

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

jest.mock('../../models/user_sprints.js', () => {
  const SequelizeMock = require("sequelize-mock");
  const dbMock = new SequelizeMock();
  return dbMock.define('user_sprints',  {
    id: 5,
    uliId: 263,
    day: 3,
    sprintNumber: 2,
    sprintDay: 1,
    
  })
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('user_sprints model', () => {

  test('should create user sprint data', async () => {
    let req = mockRequest();
    const res = mockResponse();
    req.params.id = 5;
    req.params.uliId = 263;
    req.params.day = 3;
    req.params.sprintNumber = 2;
    req.params.sprintDay = 1;

    await sprMan.startSprint(req, res)
    .then(function(user_sprints) {
        expect(user_sprints.sprintDay).toEqual(1);
    })
  });
  
});