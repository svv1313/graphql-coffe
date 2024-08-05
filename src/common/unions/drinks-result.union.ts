import { createUnionType } from '@nestjs/graphql';
import { Coffee } from '../../coffees/entities/coffee.entity/coffee.entity';
import { Tea } from '../../teas/entities/tea.entity/tea.entity';

export const DrinksResultUnion = createUnionType({
  name: 'DrinksResult',
  types: () => [Coffee, Tea],
});
