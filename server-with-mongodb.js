import { createApp } from './src/app.js';
import { ReviewModel } from './src/models/mongodb/review.js';
import { UserModel } from './src/models/mongodb/user.js';

createApp({ reviewModel: ReviewModel , userModel:UserModel});
