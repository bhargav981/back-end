const request = require("supertest");
const http = require('http');
const app = require('../app');

let apptest

beforeAll( async()=>{
  apptest = request(http.createServer(app.callback))
});

// afterEach ( async() => {
//     await server.close();
//     console.log("server closed");
// });

describe("routes: index", () => {
    test("should respond as expected", async () => {
      const response = await apptest.get("/health");
      expect(response.status).toEqual(200);
      expect(response.type).toEqual("application/json");
    });
  });