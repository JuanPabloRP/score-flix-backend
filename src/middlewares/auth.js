import jwt from 'jsonwebtoken';

export const authMiddleware =
	({ secret }) =>
	(req, res, next) => {
		const { authorization } = req.headers;

		if (!authorization)
			return res.status(401).json({ error: 'No token provided' });

		const [_, token] = authorization.split(' ');

		jwt.verify(token, secret, (err, decoded) => {
			if (err) {
				console.log({ err });
				return res.status(401).json({ error: 'Invalid token' });
			}

			req.user = decoded;
			next();
		});
	};

export const createToken = ({ payload, secret, expiresIn }) => {
	return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = ({ token, secret }) => {
	return jwt.verify(token, secret);
};

export const decodeToken = ({ token }) => {
	return jwt.decode(token);
};
