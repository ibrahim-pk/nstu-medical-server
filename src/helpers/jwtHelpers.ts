import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

export const createToken = (
  payload: Record<string, unknown>,
): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as Secret, {
    expiresIn:"365d",
  });
};

export const createResetToken = (
  payload: any,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: expireTime,
  });
};

export const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};



