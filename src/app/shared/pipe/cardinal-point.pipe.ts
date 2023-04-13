import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardinalPoint',
})
export class CardinalPointPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    let result: unknown = '';
    switch (value) {
      case 'East':
        result = 'Eastern';
        break;
      case 'West':
        result = 'Western';
        break;
      default:
        result = value;
        break;
    }
    return result;
  }
}
