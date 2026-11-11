import { ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { ExecutionContext } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator.js';
import { RolesGuard } from './roles.guard.js';

class OrganizerController {
  @Roles('organizer')
  createEvent(this: void) {}
}

function createContext(roles: string[]): ExecutionContext {
  const handler = OrganizerController.prototype.createEvent;
  return {
    getHandler: () => handler,
    getClass: () => OrganizerController,
    switchToHttp: () => ({
      getRequest: () => ({
        user: { id: 'user-123', roles },
      }),
    }),
  } as ExecutionContext;
}

describe('RolesGuard', () => {
  const reflector = new Reflector();
  const guard = new RolesGuard(reflector);

  it('allows a user with a required trusted role', () => {
    expect(guard.canActivate(createContext(['organizer']))).toBe(true);
  });

  it('rejects a user without a required role', () => {
    expect(() => guard.canActivate(createContext(['attendee']))).toThrow(
      ForbiddenException,
    );
  });
});
