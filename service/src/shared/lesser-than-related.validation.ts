import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

export function LessOrEqlThanRelated(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: LessOrEqlThanRelatedConstraint,
    });
  };
}

@ValidatorConstraint({name: 'LessOrEqlThanRelatedConstraint'})
export class LessOrEqlThanRelatedConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value <= relatedValue;
  }

  defaultMessage(args: ValidationArguments) {
    return `supplied value for ${args.property} (${args.value}) should be less than or equal to the constraint "${args.constraints}"`;
  }
}