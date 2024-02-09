import crypto from 'crypto';

const SECRET_KEY = 'rian-2024-teste';

export const authentication = (salt: string, password: string): string => {
  return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET_KEY).digest('hex');
}

export const random = () => crypto.randomBytes(128).toString('base64');