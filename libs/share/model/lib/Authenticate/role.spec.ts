import { RoleGuard } from './role.guard';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext } from '@nestjs/common';

describe('RoleGuard', () => {
      let guard: RoleGuard;

      const reflectorMock = {
            get: jest.fn(),
      };

      const jwtServiceMock = {
            verify: jest.fn(),
      };

      const contextMock = {
            switchToHttp: jest.fn(() => ({
                  getRequest: jest.fn(() => ({
                        headers: {
                              authorization: 'Bearer testToken',
                        },
                        query: {
                              token: null,
                        },
                  })),
            })),
      };

      beforeEach(() => {
            guard = new RoleGuard(
                  reflectorMock as unknown as Reflector,
                  jwtServiceMock as unknown as JwtService,
            );
      });

      // it('should return true when role is included in roles array', () => {
      //       reflectorMock.get.mockReturnValue(['admin']);

      //       jwtServiceMock.verify.mockReturnValue({ role: 'admin' });

      //       expect(guard.canActivate(contextMock as ExecutionContext)).toEqual(true);
      // });

      // it('should return false when role is not included in roles array', () => {
      //       reflectorMock.get.mockReturnValue(['user']);

      //       jwtServiceMock.verify.mockReturnValue({ role: 'admin' });

      //       expect(guard.canActivate(contextMock as ExecutionContext)).toEqual(false);
      // });

      // it('should return false when authorization is not provided', () => {
      //       reflectorMock.get.mockReturnValue(['admin']);

      //       jwtServiceMock.verify.mockReturnValue({ role: 'admin' });

      //       contextMock.switchToHttp().getRequest().headers.authorization = null;

      //       expect(guard.canActivate(contextMock as ExecutionContext)).toEqual(false);
      // });
});