require('dotenv').config();
console.log(process.env.DB_PASS)
module.exports ={
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "movie_DB",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": process.env.DATABASE_URL,
    "dialectOptions": {
      "ssl": {
        "rejectUnauthorized": false
      }
    }
  }
}
