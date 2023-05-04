import { ClassConstructor } from 'class-transformer';
import {
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	registerDecorator,
} from 'class-validator';

export const Match = <T>(
	type: ClassConstructor<T>,
	property: (o: T) => any,
	validationOptions?: ValidationOptions
) => {
	return (object: any, propertyName: string) => {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions,
			constraints: [property],
			validator: MatchConstraint,
		});
	};
};

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
	validate(value: any, args: ValidationArguments) {
		const [fn] = args.constraints;
		return fn(args.object) === value;
	}

	defaultMessage(validationArguments: ValidationArguments): string {
		const [constraintProperty]: (() => any)[] =
			validationArguments?.constraints;
		return `${constraintProperty.toString().split('.').pop()} y ${
			validationArguments.property
		} tienen que ser igual`;
	}
}
