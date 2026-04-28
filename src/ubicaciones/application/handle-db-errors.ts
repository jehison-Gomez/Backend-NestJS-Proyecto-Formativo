import { Logger } from '@nestjs/common';

export function handleDbErrors(error: any): never {
  Logger.error(error);
  throw new Error('Database error');
}
