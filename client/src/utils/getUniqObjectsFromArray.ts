export function getUniqueListBy(arr: Array<any>, key: string) {
  return [...new Map(arr.map((item: any) => [item[key], item])).values()];
}
