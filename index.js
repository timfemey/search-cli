import axios from "axios";
import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";

const cli = readline.createInterface({ input, output });

async function WikipediaSearch(keyword) {
  try {
    const res = await axios.get(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${keyword}`
    );
    console.log(res.data.query.search[0].title);
    console.log(res.data.query.search[0].snippet);
  } catch (err) {
    console.log("Cant Find Word / Wrongly Typed Word");
    console.error(err);
  }
}

cli.setPrompt(`What do you want to search for:`);
cli.prompt();
cli.on("line", (search) => {
  WikipediaSearch(search);
  cli.close();
});
