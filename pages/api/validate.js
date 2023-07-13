import jwt from 'jsonwebtoken';

export default function handler(req, res) {
    let { method, headers } = req;

    if (method === 'GET') {
        const authHeader = headers.authorization;
        const accessToken = authHeader && authHeader.split(' ')[1];

        if (!accessToken) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        jwt.verify(accessToken, 'Access_Token_Secret', (err, decoded) => {
            if (err) {
                res.status(401).json({ message: 'Unauthorized Token' });
            } else {
                res.status(200).json({ valid: true, message: "Authorized Token" });
            }
        });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ message: `Method ${method} Not Allowed` });
    }
}
