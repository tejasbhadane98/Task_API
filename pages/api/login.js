import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  let { method } = req;

  if (method === 'POST') {
    
    let { mobileNumber } = req.body;
    let accessToken = jwt.sign({ mobileNumber }, 'Access_Token_Secret', {
      expiresIn: '5m',
    });

    let refreshToken = jwt.sign({ mobileNumber }, 'Refresh_Token_Secret', {
      expiresIn: '1d',
    });

    res.status(200).json({ accessToken, refreshToken });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}
