const http = require("http");
const axios = require("axios");
const cron = require("node-cron");
const { exit } = require("process");

const port = process.env.PORT || 5000;
const me = process.env.ME;
const victim = process.env.VICTIM;
const scheduledTime = process.env.SCHEDULED_TIME || "* * * * * *";

const server = http.createServer((_, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<h1>Hello World</h1>");
});

server.listen(port, async () => {
  console.log(`Server running at port ` + port);

  if (!me && !victim) {
    console.log("no one to wake up...");
    exit(0);
  }
  cron.schedule(scheduledTime, async () => {
    if (me) {
      const resMe = await axios.get(me);
      console.log(`wake up ${me} : `, resMe.status);
    }
    if (victim) {
      const resVictim = await axios.get(victim);
      console.log(`wake up ${victim} : `, resVictim.status);
    }
  });
});
