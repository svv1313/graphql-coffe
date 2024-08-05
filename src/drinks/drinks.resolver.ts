import { Query, Resolver } from '@nestjs/graphql';
import { Coffee } from '../coffees/entities/coffee.entity/coffee.entity';
import { Tea } from '../teas/entities/tea.entity/tea.entity';
import { DrinksResultUnion } from '../common/unions/drinks-result.union';

@Resolver()
export class DrinksResolver {
  @Query(() => [DrinksResultUnion], { name: 'drinks' })
  async findAll(): Promise<(typeof DrinksResultUnion)[]> {
    const coffee = new Coffee();
    coffee.name = 'The Coffee';
    coffee.brand = 'The Brand';
    coffee.flavors = [];
    coffee.id = 1;

    const tea = new Tea();
    tea.name = 'The Tea';

    return [coffee, tea];
  }
}
