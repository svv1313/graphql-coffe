import { ObjectType } from '@nestjs/graphql';
import { Drink } from '../../../common/interfaces/drink.interface/drink.interface';

@ObjectType({ implements: () => Drink })
export class Tea implements Drink {
  name: string;
}
