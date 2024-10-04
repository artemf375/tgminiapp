"use server"
import mysql, { Connection } from 'mysql2';

const createConnection = (): Connection => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'tgminiapp',
        password: 'tgminiapp',
        database: 'CASINO_userbase'
      });
}

export async function fetchUser({
    telegram_id
}: {
    telegram_id: number
}) {
    const connection = createConnection();
    connection.connect();
    const [rows, fields]: [any[], any] = await connection.promise().query(`SELECT * FROM CASINO_userbase.users WHERE telegram_id = ${telegram_id}`);
    connection.end();
    return rows[0];
}

export async function createUser({
    telegram_id,
    telegram_name
}: {
    telegram_id: number,
    telegram_name: string | undefined | null
}) {
    const connection = createConnection();
    connection.connect();
    if (!telegram_name) {
        telegram_name = null;
    }
    const [rows, fields]: [any[], any] = await connection.promise().query(`INSERT INTO CASINO_userbase.users (telegram_id, telegram_name) VALUES (${telegram_id}, '${telegram_name}')`);
    connection.end();
    return rows;
}

export async function updateUserTONAddress({
    telegram_id,
    ton_address
}: {
    telegram_id: number,
    ton_address: string
}) {
    const connection = createConnection();
    connection.connect();
    const [result]: [mysql.ResultSetHeader, any] = await connection.promise().query(`UPDATE CASINO_userbase.users SET ton_address = '${ton_address}' WHERE telegram_id = ${telegram_id}`);
    connection.end();
    if (result.affectedRows > 0) {
        return true;
    }
    return false;
}