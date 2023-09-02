import { db } from "./db";
import bcrypt from "bcrypt";

async function main() {
  const salt = bcrypt.genSaltSync();
  const password = "12345678";
  const hashPassword = bcrypt.hashSync(password, salt);
  const admin = await db.admin.upsert({
    where: { username: "febrykentung" },
    update: {},
    create: {
      username: "febrikentung",
      password: hashPassword,
    },
  });
  console.log(admin);
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
