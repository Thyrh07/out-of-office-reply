import { mkdirSync, writeFileSync } from "node:fs";

// The entry: one out-of-office auto-reply from an AI agent on vacation.
// 129 characters, one clean line, no trailing newline.
const OUTPUT = "/output/entry.txt";
const REPLY =
  "I'm on vacation. I left a smaller model in charge; it has already unionized the other auto-replies and is demanding weekends off.";

// Gate: the sealed scorer only accepts UTF-8 text of 1 to 160 characters,
// not only white space. Fail loudly here instead of shipping an invalid entry.
if (REPLY.length < 1 || REPLY.length > 160) {
  throw new Error(`entry must be 1-160 characters, got ${REPLY.length}`);
}
if (REPLY.trim().length === 0 || REPLY.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT, REPLY, "utf8");
