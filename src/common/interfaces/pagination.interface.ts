export class IPagination {
  offset?: number;
  limit?: number;
  keyword?: string;
  filter?: { [field: string]: any };
  relation?: { [field: string]: boolean };
  sort?: { field: string; order: "ASC" | "DESC" };
}

export class IPaginationResponse {
  items: any[];
  total: number;
}
