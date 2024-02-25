export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const roundAndConvertToPercentage = (number: number) => (Math.round(number * 1000) / 1000) * 100;
