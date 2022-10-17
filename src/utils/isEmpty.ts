export const isObjectEmpty = (obj: Record<string, unknown>) =>
  obj ? Object.keys(obj).length === 0 : true;
