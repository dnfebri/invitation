import { db } from "./db";
import bcrypt from "bcrypt";

async function main() {
  const salt = bcrypt.genSaltSync();
  const hashPassword = bcrypt.hashSync("12345678", salt);
  const alice = await db.admin.upsert({
    where: { username: "febrykentung" },
    update: {},
    create: {
      username: "febrikentung",
      password: hashPassword,
    },
  });
  console.log(alice);
}
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
