import jwt from 'jsonwebtoken';

export default function handler(req, res) {
    const { method, query } = req;

    if (method === 'GET') {
        let { refreshToken } = query;

        if (!refreshToken) {
            res.status(400).json({ message: 'Missing refresh_token' });
            return;
        }

        jwt.verify(refreshToken, 'Refresh_Token_Secret', (err, decoded) => {
            if (err) {
                res.status(401).json({ message: 'Invalid refresh_token' });
            } else {
                const newAccessToken = jwt.sign({ mobileNumber: decoded.mobileNumber }, 'Access_Token_Secret', {
                    expiresIn: '5m',
                });

                res.status(200).json({ newAccessToken });
            }
        });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ message: `Method ${method} Not Allowed` });
    }
}
