const mongoose = require("mongoose");

// A mistyped connection string usually shows up as an opaque "bad auth", so
// check its shape first and name the mistake. Never log the credential itself.
const diagnose = (url) => {
  if (!url) return ["MONGO_URL is not set"];

  const problems = [];
  if (/^\s|\s$/.test(url)) problems.push("has leading or trailing whitespace");
  if (/\s/.test(url)) problems.push("contains a space inside the value");
  if (/["']/.test(url)) problems.push("is wrapped in quotes - remove them");
  if (!/^mongodb(\+srv)?:\/\//i.test(url.trim()))
    problems.push("does not start with mongodb:// or mongodb+srv://");

  if (/[<>]/.test(url))
    problems.push(
      "still contains < > - Atlas shows the password as <db_password> and both the brackets and the words inside them must be replaced"
    );

  // A password may itself contain "@", so the credential section runs up to the
  // last "@" of the authority, not the first.
  const authority = url
    .slice(url.indexOf("://") + 3)
    .split("/")[0]
    .trim();
  const at = authority.lastIndexOf("@");
  const sep = authority.lastIndexOf(":", at === -1 ? authority.length : at);

  if (at === -1) {
    // mongodb://localhost:27017/db is a normal unauthenticated local server.
    if (/\+srv/i.test(url))
      problems.push("has no user and password - expected user:password@host");
  } else if (sep === -1 || sep > at) {
    problems.push("has no password - expected user:password@host");
  } else {
    const password = authority.slice(sep + 1, at);
    if (!password) problems.push("the password section is empty");
    const unsafe = [...password].filter((c) => /[:@/?#[\]]/.test(c));
    if (unsafe.length)
      problems.push(
        `the password has characters that must be URL-encoded (${[...new Set(unsafe)].join(" ")}) - e.g. @ becomes %40`
      );
  }
  return problems;
};

// Driver errors can echo the whole URI back.
const scrub = (value) =>
  String(value).replace(/mongodb(\+srv)?:\/\/[^@/\s]*@/gi, "mongodb$1://***@");

const connectDB = async () => {
  const url = process.env.MONGO_URL;
  const problems = diagnose(url);

  if (problems.length) {
    console.error("MONGO_URL looks malformed:");
    for (const p of problems) console.error(`  - ${p}`);
    process.exit(1);
  }

  try {
    await mongoose.connect(url);
    console.log("MongoDB connected successfully");
  } catch (err) {
    const message = scrub(err.message);
    console.error("MongoDB connection failed:", err.codeName || err.name || "Error");
    console.error(`  ${message}`);
    if (/bad auth|authentication failed/i.test(message))
      console.error(
        "  - The cluster was reached and rejected the credentials. The database user's password is not what is in MONGO_URL. Reset it in Atlas under Data Access > Database Access > Edit user - that password is separate from your cloud.mongodb.com login."
      );
    else if (/ENOTFOUND|EAI_AGAIN|ECONNREFUSED|ETIMEDOUT|timed out|server selection/i.test(message))
      console.error(
        "  - The cluster was never reached. Check the SRV hostname in MONGO_URL, and that Atlas Network Access allows this server (0.0.0.0/0 for Render's dynamic IPs)."
      );
    process.exit(1);
  }
};

module.exports = connectDB;
