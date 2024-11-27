import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prix',
  standalone: true
})
export class PRIXPipe implements PipeTransform {

  transform(value: number): string {
    const formattedPrice = value.toFixed(2);
    return `${formattedPrice} TND`;
  }

}

