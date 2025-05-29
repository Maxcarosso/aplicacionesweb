import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydb.db');

export function createUserTable() {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT);'
    );
  });
}

export function insertUser(name, email, callback) {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO users (name, email) values (?, ?)',
      [name, email],
      (_, result) => callback && callback(result),
      (_, error) => { console.log(error); return false; }
    );
  });
}

export function getUsers(callback) {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM users',
      [],
      (_, { rows }) => callback && callback(rows._array),
      (_, error) => { console.log(error); return false; }
    );
  });
}

export default db; 