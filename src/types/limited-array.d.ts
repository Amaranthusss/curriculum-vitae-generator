declare type LimitedArray<
  T,
  N extends number,
  R extends unknown[] = []
> = R["length"] extends N ? R : LimitedArray<T, N, [T, ...R]>;
