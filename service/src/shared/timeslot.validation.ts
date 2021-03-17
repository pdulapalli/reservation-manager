import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'timeslot', async: false })
export class TimeslotAllowed implements ValidatorConstraintInterface {
  validate(timeslot: string, _args: ValidationArguments) {
    if (typeof timeslot !== 'string') {
      return false;
    }

    if (timeslot.length !== 4) {
      return false;
    }

    const hours = Number.parseInt(timeslot.slice(0, 2));
    const mins = Number.parseInt(timeslot.slice(2));

    if (hours < 0 || hours > 24) {
      return false;
    }

    return mins % 15 === 0;
  }

  defaultMessage(args: ValidationArguments) {
    return `timeslot (${args.value}) does not follow 15-minute slot convention!`;
  }
}
