import Joi from 'joi';

const validate = (schema, req, res, next) => {
	const options = {
		abortEarly: true,
		stripUnknown: true
	};
	const { error, value } = schema.validate(req.body, options);
	
	let message = '';

	if (error){
		switch (error.details[0].path[0]){
			case "firstName":
				message = "Neteisingai nurodytas vardas"
				break
			case "lastName":
				message = "Neteisingai nurodyta pavardė"
				break
			case "userName":
				message = "Neteisingai nurodyta slapyvardis"
				break
			case "email":
				message = "Neteisingai nurodytas el. pašto adresas"
				break
			case "password":
				message = "Neteisingai nurodytas slaptažodis"
				break
			case "caption":
				message = "Pavadinimas negali būti tuščias"
				break
			case "image":
				message = "Privaloma parinkti nuotrauką"
				break
			default:
				message = "Neteisingai užpildyti laukeliai"
				break
		}

		return res.status(500).send(message);
	} 
		

	req.body = value;
	next();
};

export const postValidator = (req, res, next) => {
	const schema = Joi.object({
		caption: Joi.string().required(),
		image: Joi.string()
	});

	validate(schema, req, res, next);
};

export const registerValidator = (req, res, next) => {
	const schema = Joi.object({
		firstName: Joi.string().min(2).max(50).required(),
		lastName: Joi.string().min(2).max(50).required(),
		userName: Joi.string().min(2).max(50).required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(6).max(12).required(),
		
	});

	validate(schema, req, res, next);
};

export const loginValidator = (req, res, next) => {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(6).max(12).required()
	});

	validate(schema, req, res, next);
};

export const commentsValidator = (req, res, next) => {
	const schema = Joi.object({
		comment: Joi.string().min(5).required(),
		postId: Joi.number().required()

	});

	validate(schema, req, res, next);
};

export default validate;
