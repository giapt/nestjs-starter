import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import * as _ from 'lodash';
import { IPagination } from '../interfaces';
import { IApiPagination } from '../decorators';

interface PaginationRequest extends Request {
  query: any;
  pagination: IPagination;
}

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  private readonly config: IApiPagination;

  constructor(config: IApiPagination) {
    this.config = config;
  }

  goNext(next: CallHandler) {
    return next.handle().pipe(
      tap({
        next: (val: unknown): void => {},
      }),
    );
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<PaginationRequest>();

    const defaultConfig = {
      defaultSize: 10,
      maxSize: 30,
      filterFields: [],
      offset: 0,
      sortFields: '',
      defaultSort: null,
      defaultOffset: null,
    };
    const {
      defaultSize,
      maxSize,
      filterFields,
      sortFields,
      defaultSort,
      defaultOffset,
    } = {
      ...defaultConfig,
      ...this.config,
    };

    const pagination: any = {};

    const size = parseInt(req?.query?.size || '0') || defaultSize;
    pagination.limit = Math.min(size, maxSize) || 1;

    const offset = parseInt(req.query?.offset || 0);

    pagination.offset = offset || defaultOffset || 0;

    if (req.query.keyword) {
      pagination.keyword = req.query?.keyword || null;
    }

    try {
      const filter = JSON.parse(req.query?.filter);
      pagination.filter = _.pick(filter, filterFields);
    } catch (error) {}

    try {
      if (!req.query?.sort) {
        pagination.sort = defaultSort;

        req.pagination = pagination;

        return this.goNext(next);
      }

      let sort = JSON.parse(req.query?.sort);

      const sorts = Object.keys(sort).map((key) => {
        return {
          field: key,
          order: sort[key],
        };
      });

      sort = sorts?.[0];

      if (
        sort &&
        sortFields?.length &&
        sortFields?.includes(sort.field) &&
        ['ASC', 'DESC'].includes(sort.order)
      ) {
        pagination.sort = sort;
      } else {
        pagination.sort = defaultSort;
      }

      req.pagination = pagination;
      return this.goNext(next);
    } catch (error) {
      pagination.sort = defaultSort;

      req.pagination = pagination;
      return this.goNext(next);
    }
  }
}
