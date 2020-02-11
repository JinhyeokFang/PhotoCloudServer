import { Document } from 'mongoose';
import Photo from './photo.interface';

interface UserDoc extends Document {
    username: string;
    password: string;
    photos: Photo[];
};

export default UserDoc;