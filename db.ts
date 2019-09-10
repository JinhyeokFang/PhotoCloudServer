import mongoose from 'mongoose';

import config from './config';

class DB {
    public initialize(): void {
        mongoose.connect(`mongodb+srv://jinhyeokfang:dbpassword@cluster0-osjxh.azure.mongodb.net/test?retryWrites=true&w=majority`, {
            useNewUrlParser: true
        });
    }
}

export default new DB();