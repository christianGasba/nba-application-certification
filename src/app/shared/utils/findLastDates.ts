export function findLastDates(arrayLength: number = 12): string[] {
  return Array.from({ length: arrayLength }, (_, index) => index + 1)
    .map((el: number) => {
      const today: Date = new Date();
      const result: Date = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - el
      );
      return result;
    })
    .map((el) => `${el.getFullYear()}-${el.getMonth() + 1}-${el.getDate()}`);
}
