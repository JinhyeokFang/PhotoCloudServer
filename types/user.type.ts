import { Document } from 'mongoose';
import Photo from './photo.type';

interface UserModel extends Document {
    username: string;
    password: string;
    photos: Photo[];
};

export default UserModel;