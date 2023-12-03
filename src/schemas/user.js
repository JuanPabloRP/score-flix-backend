import z from 'zod';

const userSchema = z.object({
	userId: z.string().uuid(),
	fullName: z.string({
		invalid_type_error: 'Full name must be a string',
		required_error: 'Full name is required',
	}),
	email: z.string().email({
		message: 'Email must be a valid email address',
	}),
	password: z.string().min(8, {
		message: 'Password must be at least 8 characters long',
	}),
	isAdmin: z.boolean(),
	isReviewer: z.boolean(),
	registrationDate: z.date(),
	lastConnection: z.date(),
	isAuthorized: z.boolean(),
	avatar: z.string().url({
		message: 'Avatar must be a valid url',
	}),
	reviews: z.array(z.string()),
	likedReviews: z.array(z.string()),
	dislikeReviews: z.array(z.string()),
	totalLikes: z.number().int().min(0),
	totalDislikes: z.number().int().min(0),
	favoriteReviews: z.array(z.string()),
	bio: z.string(),
});

export function validateSchema(obj) {
	return userSchema.safeParse(obj);
}

export function validatePartialSchema(obj) {
	return userSchema.partial().safeParse(obj);
}
