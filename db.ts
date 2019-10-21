import mongoose from 'mongoose';

class DB {
    public initialize(): void {
        mongoose.connect(`mongodb://localhost:27017/photocloud`, {
            useNewUrlParser: true   
        });
    }
}

export default new DB();