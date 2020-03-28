module.exports = {
  "POST /api/login": (req, res) => {
    const username = req.body.username || "测试用户";
    const token = new Date().getTime();
    // console.log(req.body);
    res.send({
      errCode: "00",
      errMsg: "",
      data: {
        username,
        token,
        currentAuthority: ["user"]
      }
    });
  }
};
