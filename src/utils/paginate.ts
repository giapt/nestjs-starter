import { ApiProperty } from '@nestjs/swagger';

export class Paginate<T> {
  // @ApiProperty()
  // total: number;

  items: T[];
  meta: any;

  constructor(datas: T[], meta?: any) {
    this.meta = meta;
    this.items = datas;
  }
}
