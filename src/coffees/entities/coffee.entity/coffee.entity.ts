import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Flavor } from 'src/coffee/entities/flavor.entity/flavor.entity';
import { Drink } from '../../../common/interfaces/drink.interface/drink.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CoffeeType } from '../../../common/enums/coffee-type.enum';
import { loggerMiddleware } from '../../../common/middleware/logger.middleware';

@Entity()
@ObjectType({ description: 'The coffee model', implements: () => Drink })
export class Coffee implements Drink {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'Id of the coffee' })
  id: number;
  @Field({ middleware: [loggerMiddleware] })
  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, { cascade: true })
  flavors?: Flavor[];

  @CreateDateColumn()
  createdAt?: Date;

  @Column({ nullable: true })
  type?: CoffeeType;
}
