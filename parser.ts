import mailparser, { simpleParser } from "mailparser";
import fs from "node:fs";
import { inspect } from "node:util";

console.log("getting email from ses...");
const source = fs.readFileSync("./two_file", "utf-8");
// console.log(`[parser.ts]: the value of source is ${source}`);

simpleParser(source, (err, parsed) => {
  // console.log(
  //   `[parser.ts]: the value of parsed is ${inspect(parsed.attachments, { depth: null, colors: true })}`,
  // );
  console.log("going over attachments data...");
  const attachments = parsed.attachments;
  attachments.map((file, idx) => {
    console.log("saving file... ");
    fs.writeFileSync(
      file.filename ? file.filename : `file_${idx}.pdf`,
      file.content,
    );
  });
});
