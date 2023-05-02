export interface IPaginationOptions {
  pageNo: number,
  pageSize: number
}

export interface IPaginationResult<T>{
  list: T[],
  count: number
}