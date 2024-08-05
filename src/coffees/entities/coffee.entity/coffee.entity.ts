import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Flavor } from 'src/coffee/entities/flavor.entity/flavor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType({ description: 'The coffee model' })
export class Coffee {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'Id of the coffee' })
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, { cascade: true })
  flavors?: Flavor[];

  @CreateDateColumn()
  createdAt?: Date;
}
