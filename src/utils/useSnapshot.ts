import { useSnapshot as useSnapshotOrigin } from 'valtio';

type DeepWritable<T> = {
  -readonly [P in keyof T]: DeepWritable<T[P]>;
};

/**
 * @description useSnapshot with writable
 */
export const useSnapshot = <T extends object>(proxyObject: T) => {
  const snap = useSnapshotOrigin(proxyObject);
  return snap as DeepWritable<T>;
};
