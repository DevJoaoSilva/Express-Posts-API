import { DB } from './protocol';
import { mysqlConnection } from './mysqlConnection';

class Mysql implements DB {
    public async connectDB() {
        try {  
            await mysqlConnection?.authenticate();
             
            console.log('Connected to Mysql');
            
        } catch (error) {
            console.log(error);
        }
    }
}

export default new Mysql().connectDB;