import z from 'zod';

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
      "Fantasía",
      "Misterio",
			'Otro',
		])
	),
	date: z.date(),
	duration: z.number().int().positive(),
	rate: z.number().min(0).max(10),
	poster: z.string().url({
		message: 'Poster must be a valid url',
	}),
	director: z.string(),
	likes: z.number().int().positive(),
	dislikes: z.number().int().positive(),
});

export function validateSchema(obj:object){
  return reviewSchema.safeParse(obj);
}

export function validatePartialSchema(obj:object){
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
year
likes
dislikes
userId
*/
