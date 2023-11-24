interface IDoc {
  _id?: string;
  status?: number;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}

interface IResultDoc {
  success: boolean;
  message: string;
  data?: IDoc;
}

interface IResultDocs {
  success: boolean;
  message: string;
  data?: IDoc[];
  pageInfo?: object;
}

interface IFilterQuery {
  orderBy?: object;
  where?: any;
  limit: number;
  skip: number;
  select?: string[];
}

export { IDoc, IResultDoc, IResultDocs, IFilterQuery };
