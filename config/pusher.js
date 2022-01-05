const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1310714",
  key: "218c7ba6de5886e3994a",
  secret: "9d2c71621f7c89daa0c9",
  cluster: "eu",
  useTLS: true,
});

module.exports = pusher;
