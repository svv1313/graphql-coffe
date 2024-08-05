import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';

@InputType({ description: 'Create coffee input object type.' })
export class CreateCoffeeInput {
  @MinLength(3)
  @MaxLength(25)
  @Field({ description: 'The name of the coffee.' })
  name: string;

  @MinLength(3)
  @MaxLength(25)
  brand: string;
  flavors: string[];
}
