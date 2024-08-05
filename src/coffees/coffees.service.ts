import { Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input/create-coffee.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity/coffee.entity';
import { Repository } from 'typeorm';
import { UserInputError } from '@nestjs/apollo';
import { UpdatedCoffeeInput } from './dto/updated-coffee.input/updated-coffee.input';
import { Flavor } from 'src/coffee/entities/flavor.entity/flavor.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorsRepository: Repository<Flavor>,
  ) {}

  async findAll() {
    return this.coffeesRepository.find();
  }

  async findOne(id: number) {
    const coffee = await this.coffeesRepository.findOne({ where: { id } });

    if (!coffee) {
      throw new UserInputError(`Coffee #${id} does not exist`);
    }

    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeInput) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavors(name)),
    );

    const coffee = this.coffeesRepository.create({
      ...createCoffeeDto,
      flavors,
    });

    return this.coffeesRepository.save(coffee);
  }

  async update(id: number, updateCoffeeInput: UpdatedCoffeeInput) {
    const flavors =
      updateCoffeeInput.flavors &&
      (await Promise.all(
        updateCoffeeInput.flavors.map((name) => this.preloadFlavors(name)),
      ));

    const coffee = await this.coffeesRepository.preload({
      id,
      ...updateCoffeeInput,
      flavors,
    });

    if (!coffee) {
      throw new UserInputError(`Coffee #${id} does not exist`);
    }

    return this.coffeesRepository.save(coffee);
  }

  async remove(id: number) {
    const coffee = await this.findOne(id);

    if (!coffee) {
      throw new UserInputError(`Coffee #${id} does not exist`);
    }

    return this.coffeesRepository.remove(coffee);
  }

  private async preloadFlavors(flavorName: string): Promise<Flavor> {
    const flavor = await this.flavorsRepository.findOne({
      where: { name: flavorName },
    });

    if (flavor) {
      return flavor;
    }

    return this.flavorsRepository.create({ name: flavorName });
  }
}
