import { envsafe, str, port } from 'envsafe';
import dotenv from 'dotenv';

dotenv.config();

export const env = envsafe({
  DATABASE_URL: str({
    default: 'postgresql://user:password@localhost:5432/mydb'
  }),
  JWT_SECRET: str({
    default: 'your-secret-key'
  }),
  PORT: port({
    default: 3000
  }),
});