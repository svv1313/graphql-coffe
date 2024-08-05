import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Create coffee input object type.' })
export class CreateCoffeeInput {
  @Field({ description: 'The name of the coffee.' })
  name: string;
  brand: string;
  flavors: string[];
}
