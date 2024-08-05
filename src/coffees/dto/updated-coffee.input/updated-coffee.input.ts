import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCoffeeInput } from '../create-coffee.input/create-coffee.input';

@InputType()
export class UpdatedCoffeeInput extends PartialType(CreateCoffeeInput) {}
