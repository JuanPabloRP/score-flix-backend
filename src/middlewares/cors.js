import cors from 'cors';

const ACCEPTED_ORIGINS = [
	'http://localhost:5173',
	'https://karratha-redback-hnae.1.us-1.fl0.io/',
];

export const corsMiddleware = ({ accepted_origins = ACCEPTED_ORIGINS } = {}) =>
	cors({
		origin: (origin, callback) => {
			if (accepted_origins.includes(origin)) {
				return callback(null, true);
			}

			if (!origin) {
				return callback(null, true);
			}

			return callback(new Error('Not alloweb by CORS'));
		},
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
	});
