import { createApp } from './src/app.js';
import { ReviewModel } from './src/models/mongodb/review.js';

createApp({ reviewModel: ReviewModel });
