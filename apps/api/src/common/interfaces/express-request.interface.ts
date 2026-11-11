import type { AuthenticatedUser } from '../../modules/auth/authenticated-user.js';

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}
