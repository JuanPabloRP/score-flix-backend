import jwt from 'jsonwebtoken';

export const authMiddleware =
	({ secret }) =>
	(req, res, next) => {
		const { authorization } = req.headers;

		if (!authorization)
			return res.status(401).json({ error: 'No token provided' });

		jwt.verify(authorization, secret, (err, decoded) => {
			if (err) return res.status(401).json({ error: 'Invalid token' });

			req.user = decoded;
		});
		next();
	};

export const createToken = ({ payload, secret, expiresIn }) => {
	return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = ({ token, secret }) => {
	return jwt.verify(token, secret);
};

