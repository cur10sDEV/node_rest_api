const { expect } = require("chai");
const { loginUser, signUpUser, getUserStatus } = require("../controllers/auth");
const sinon = require("sinon");
const User = require("../models/User");
const connectDB = require("../db/connectDB");
const mongoose = require("mongoose");

describe("Auth Controller - Login", () => {
  before(() => connectDB("mongodb://127.0.0.1:27017/test"));
  it("should throw an error with code 500 if database access fails", async () => {
    sinon.stub(User, "findOne");
    User.findOne.throws();
    const req = {
      body: {
        email: "test@tester.com",
        password: "test123",
      },
    };
    const result = await loginUser(req, {}, () => {});
    expect(result).to.be.an("error");
    expect(result).to.have.property("statusCode", 500);
    User.findOne.restore();
  });
  after(() => mongoose.disconnect());
});

describe("Auth Controller - Status", () => {
  before(() => connectDB("mongodb://127.0.0.1:27017/test"));
  it("should throw error if no or invalid userId", async () => {
    const req = {
      userId: "64bb67a8d2f78f5f86095a81",
    };
    const result = await getUserStatus(req, {}, () => {});
    expect(result).to.be.an("error");
    expect(result).to.have.property("statusCode", 404);
  });

  it("should return userStatus if valid userId of existing user", async () => {
    const user = await new User({
      email: "test@test.com",
      password: "test123",
      username: "testyyy",
    });
    await user.save();
    const req = {
      userId: user._id,
    };
    const res = {
      statusCode: 500,
      userStatus: null,
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.userStatus = data.status;
      },
    };
    await getUserStatus(req, res, () => {});
    expect(res).to.have.property("statusCode", 200);
    expect(res).to.have.property("userStatus", "I am new!");
    await User.deleteMany({ email: user.email });
  });
  after(() => mongoose.disconnect());
});
