import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'The coffee model' })
export class Coffee {
  @Field(() => ID, { description: 'Id of the coffee' })
  id: number;
  name: string;
  brand: string;
  flavors: string[];
}
