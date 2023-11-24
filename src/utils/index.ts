const cleanObject = (object: any) => {
  Object.entries(object).forEach(([k, v]: any) => {
    if (v && typeof v === 'object') cleanObject(v);
    if ((v && typeof v === 'object' && !Object.keys(v).length) || v === null || v === undefined || v.length === 0) {
      if (Array.isArray(object)) object.splice(k, 1);
      else if (!(v instanceof Date)) delete object[k];
    }
  });
  return object;
};

const isLogicalQuery = (key: string) => ['or', 'nor', 'not', 'and'].includes(key);

const isRegexQuery = (key: string) => ['regex'].includes(key);

const processQueryCondition = (filter = {}) =>
  Object.entries(filter).reduce((acc: any, [key, operators]) => {
    if (isLogicalQuery(key)) {
      return {
        ...acc,
        [`$${key}`]: processFieldLogical(operators)
      };
    }
    return {
      ...acc,
      [key]: processFieldComparison(operators)
    };
  }, {});

const getPageInfo = (docCount: number, limit: number, skip: number) => {
  const totalPage = limit > 0 ? Math.ceil(docCount / limit) || 1 : 0;
  // const currentPage = Math.ceil((skip + 1) / limit);
  const currentPage = skip + 1;

  return {
    limit,
    totalDocs: docCount,
    totalPage,
    currentPage,
    hasNextPage: currentPage < totalPage,
    hasPreviousPage: currentPage > 1
  };
};

const isFieldComparision = (key: string) => ['eq', 'ne', 'gte', 'lte', 'gt', 'lt'].includes(key);

const processAggsQueryCondition = (filter = {}) =>
  Object.entries(filter).reduce((acc: any, [key, operators]) => {
    if (isLogicalQuery(key)) {
      return {
        ...acc,
        [`$${key}`]: processAggsFieldLogical(operators)
      };
    }
    return {
      ...acc,
      [key]: processAggsFieldComparison(key, operators)
    };
  }, {});

const processAggsQuery = (aggs = []) =>
  aggs.map((aggQuery) =>
    Object.entries(aggQuery).reduce(
      (acc: any, [key, operators]: any) => ({
        ...acc,
        [`$${key}`]: processFieldAggs(operators)
      }),
      {}
    )
  );

const processAggsFieldComparison = (key: string, operators: any) =>
  Object.entries(operators).reduce((acc, [operator, value]: any) => {
    let data = value;
    const newOperator: any = {};
    if (isRegexQuery(operator)) {
      newOperator.$options = 'i';
    }
    if (isFieldComparision(operator)) {
      return {
        ...acc,
        [`$${operator}`]: data
      };
    }
    return {
      ...acc,
      [operator]: data
    };
  }, {});

const processAggsFieldLogical = (filter: any) =>
  filter.reduce((acc: any, item: any) => [...acc, processAggsQueryCondition(item)], []);

const processFieldAggs = (filter: any): any =>
  Object.entries(filter).reduce((acc: any, [key, value]: any) => {
    if (isLogicalQuery(key)) {
      return {
        ...acc,
        [`$${key}`]: processAggsFieldLogical(value)
      };
    }
    return {
      ...acc,
      [key]: processAggsFieldComparison(key, value)
    };
  }, {});

const processFieldComparison = (operators: any) =>
  Object.entries(operators).reduce((acc, [operator, value]) => {
    const newOperator: any = {
      ...acc,
      [`$${operator}`]: value
    };
    if (isRegexQuery(operator)) {
      newOperator.$options = 'i';
    }
    return newOperator;
  }, {});

const processFieldLogical = (filter: any) =>
  filter.reduce((acc: any, item: any) => [...acc, processQueryCondition(item)], []);

export {
  cleanObject,
  isLogicalQuery,
  processQueryCondition,
  processFieldComparison,
  processFieldLogical,
  getPageInfo,
  processAggsQuery
};
