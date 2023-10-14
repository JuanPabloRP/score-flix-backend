import z from 'zod';

const stringToNumberSchema = z
	.string()
	.refine((str) => !isNaN(parseFloat(str)), {
		message: 'La duración debe ser un número válido.',
	})
	.transform((str) => parseFloat(str));

const reviewSchema = z.object({
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
	duration: z
		.string()
		.refine((str) => !isNaN(parseFloat(str)), {
			message: 'La duración debe ser un número válido.',
		})
		.transform((str) => parseFloat(str)),
	rate: z
		.string()
		.refine((str) => !isNaN(parseFloat(str)), {
			message: 'La duración debe ser un número válido.',
		})
		.transform((str) => parseFloat(str)),
	poster: z.string().url({
		message: 'Poster must be a valid url',
	}),
	likes: z.number().int().min(0),
	dislikes: z.number().int().min(0)
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
