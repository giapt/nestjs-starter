import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    return data ? req.user && req.user[data] : req.user;
  },
);

export class TokenSecurityOptionDto {
  notCheckConnectedWallet?: boolean;
  scopes?: string[];
}

export const TokenSecurityOptionMetadata = 'TokenSecurityOption';

export const TokenSecurityOption = (option?: TokenSecurityOptionDto) =>
  SetMetadata(TokenSecurityOptionMetadata, option);
