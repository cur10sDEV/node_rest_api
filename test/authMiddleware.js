const { expect } = require("chai");
const isAuth = require("../middlewares/isAuth");
const jwt = require("jsonwebtoken");
const sinon = require("sinon");

describe("Authorization", () => {
  it("should throw error if no auth header is present", () => {
    const req = {
      get: (headerName) => null,
    };
    expect(isAuth.bind(this, req, {}, () => {})).to.throw("Not authenticated");
  });
  it("should throw error if auth header is one string", () => {
    const req = {
      get: (headerName) => "Bearer",
    };
    expect(isAuth.bind(this, req, {}, () => {})).to.throw("Not authenticated");
  });
  it("should throw error if jwt is invalid", () => {
    const req = {
      get: (headerName) =>
        "Bearer afjdkjaslkfjajfvbklaudfbfafvblkajljbvfahlfal",
    };
    expect(isAuth.bind(this, req, {}, () => {})).to.throw("jwt malformed");
  });
  it("should give userId if jwt verfies successfully", () => {
    const req = {
      get: (headerName) =>
        "Bearer afjdkjaslkfjajfvbklaudfbfafvblkajljbvfahlfal",
    };
    sinon.stub(jwt, "verify");
    jwt.verify.returns({ userId: "abc" });
    isAuth(req, {}, () => {});
    expect(req).to.have.property("userId");
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });
});
