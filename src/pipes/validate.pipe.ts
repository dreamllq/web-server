import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { BadException } from 'src/exceptions/bad.exception';
import { toPlainObject } from 'lodash';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadException('Validation failed', errors);
    }
    // return value;
    return toPlainObject(object);
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [
      String,
      Boolean,
      Number,
      Array,
      Object
    ];
    return !types.includes(metatype);
  }
}