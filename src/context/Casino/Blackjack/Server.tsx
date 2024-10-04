"use server";
import { create } from 'domain';
import mysql, { Connection } from 'mysql2';

const createConnection = (): Connection => {
  return mysql.createConnection({
      host: 'localhost',
      user: 'tgminiapp',
      password: 'tgminiapp',
      database: 'CASINO_userbase'
    });
}

export const getPlayerBalance = async (telegram_id: number): Promise<number> => {
    "use server";
    const connection = createConnection();
    connection.connect();
    const [rows]: [any[], any] = await connection.promise().query(`SELECT balance FROM CASINO_userbase.users WHERE telegram_id = ${telegram_id}`);
    connection.end();
    return rows[0].balance || 0;
};

export const updatePlayerBalance = async (telegram_id: number, newBalance: number): Promise<boolean> => {
    "use server";
    const connection = createConnection();
    connection.connect();
    const [res]: [mysql.ResultSetHeader, any] = await connection.promise().query(`UPDATE CASINO_userbase.users SET balance = ${newBalance} WHERE telegram_id = ${telegram_id}`);
    connection.end();
    if (res.affectedRows > 0) {
        return true;
    } else {
        return false;
    }
}