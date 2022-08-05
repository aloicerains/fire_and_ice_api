import { createPool, Pool} from 'mysql';


let pool: Pool;

export const dbInit = () => {
    try {
        pool = createPool({
            connectionLimit: 4,
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PWD,
            database: process.env.DB_NAME
        });
        console.log('Database connected successfully!');
    } catch (error) {
        console.error("Database connection failed!")
    };
}

/**
 * sqlExecute executes queries in MySQl database
 * 
 * @param { string[] | Object } params - provides the parameterized values
 * @param { string } query provides sql query
 */

export const sqlExecute = <T>(query: string,
     params: string[] | Object): Promise<T> => {
        try {
            if (!pool) {
                throw new Error('Database not connected!');
            }
            return new Promise<T>((resolve, reject) => {
                pool.query(query, params, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
            });
        } catch (error) {
            console.error(error);

        }
     }