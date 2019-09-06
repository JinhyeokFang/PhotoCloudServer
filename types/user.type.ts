import { Document } from 'mongoose';

interface Photo {
    url: string;
    date: string;
};

interface UserModel extends Document {
    username: string;
    password: string;
    photos: Photo[];
};

export default UserModel;