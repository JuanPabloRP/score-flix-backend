import z from 'zod';

const reviewSchema = z.object({
	userId: z.string({
		invalid_type_error: "User id must be a string",
		required_error: "User id is required"
	}),
	reviewId: z.string(),
	title: z.string({
		invalid_type_error: 'Review title must be a string',
		required_error: 'Movie title is required',
	}),
	genre: z.array(
		z.enum([
			'Drama',
			'Acción',
			'Ciencia ficción',
			'Crimen',
			'Historia',
			'Autobiografía',
			'Aventura',
			'Romance',
			'Comedia',
			'Terror',
			'Fantasía',
			'Misterio',
			'Otro',
		])
	),
	date: z.string(),
	duration: z.string().refine((str) => !isNaN(parseFloat(str)), {
		message: 'La duración debe ser un número válido.',
	}),
	rate: z.string().refine((str) => !isNaN(parseFloat(str)), {
		message: 'La duración debe ser un número válido.',
	}),
	poster: z.string().url({
		message: 'Poster must be a valid url',
	}),
	likes: z.number().int().min(0),
	dislikes: z.number().int().min(0),
	director: z.string({
		invalid_type_error: "Director's name must be a string",
		required_error: "Director's name is required"
	}) ,
	content: z.string({
		invalid_type_error: "Review's content must be a string",
	}),
	comments: z.array(z.object({
		userId: z.string(),
		commentId: z.string(),
		content: z.string(),
	}))
});

export function validateSchema(obj) {
	return reviewSchema.safeParse(obj);
}

export function validatePartialSchema(obj) {
	return reviewSchema.partial().safeParse(obj);
}

/*
id 
title
genre []
duration
director
rate
poster
date
likes
dislikes
userId
*/
