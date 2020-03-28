// eslint-disable-next-line
const delay = require("doly-mocker-api/utils/delay");
const login = require("./login");

const noMock = process.env.MOCK === "none";

// mock数据
const mocks = {
  ...login
};

module.exports = noMock ? {} : delay(mocks, 1000);
