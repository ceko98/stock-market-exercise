import { Stock as Member } from '../types/stocks';
import { BaseModel } from './base-model';

export interface Stock extends Member {}''

export class Stock extends BaseModel {
  static tableName = 'stock';
}
