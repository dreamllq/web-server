import { BadRequestException } from '@nestjs/common';

export class BadException extends BadRequestException {
  details: any[];
  constructor(msg, details) {
    super(msg);
    this.details = details;
  }
} 