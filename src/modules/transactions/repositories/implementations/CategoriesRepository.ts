import { getRepository, Repository } from 'typeorm';

import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../ICategoriesRepository';
import { ICreateCategoryDTO } from '../../dtos/ICreateCategoryDTO';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name });

    return category;
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async create(name: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create(name);

    await this.repository.save(category);

    return category;
  }

}

export { CategoriesRepository }