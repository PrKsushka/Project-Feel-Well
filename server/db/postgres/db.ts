import { createConnection} from 'typeorm';

const connectionToPostgresDataBase=()=>{
    try {
        createConnection().then((res)=>{
            console.log('connection success')
        })
    }catch (e) {
        console.log('Connection failed');
        process.exit(1);
    }
}
export default connectionToPostgresDataBase;