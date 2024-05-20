db = db.getSiblingDB("admin");
db.createUser({
  user: process.env.MONGO_CCAC_USERNAME,
  pwd: process.env.MONGO_CCAC_PASSWORD,
  roles: [
    {
      role: "readWrite",
      db: process.env.MONGO_INITDB_DATABASE,
    },
  ],
});
print("Created default ccac user");
