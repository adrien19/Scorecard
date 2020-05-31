import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe, DatePipe, PercentPipe } from '@angular/common';

@Pipe({ name: 'formatCell' })
export class FormatCellPipe implements PipeTransform {
  constructor(
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe,
    private percentPipe: PercentPipe
  ) {}
  transform(
    value: any,
    format: {
      formatType?: string;
      currencySymbol?: string;
      currencyCode?: string;
      dateFormat?: string;
      dateTimeZone?: string;
      percentFormat?: string;
    }
  ) {
    const symbol = '';

    if (value === undefined) {
      return 'not available';
    }
    if (format.formatType === 'default') {
      if (Array.isArray(value)) {
        if (typeof value[0] !== 'object') {
          return value.join(', ');
        } else {
          return value
            .map((obj) => {
              return obj.name;
            })
            .join(', ');
        }
      }
      if (typeof value === 'object') {
        return value.name;
      }
    }

    if (format.formatType === 'currency') {
      if (format.currencySymbol && format.currencyCode) {
        return this.currencyPipe.transform(
          value,
          format.currencyCode,
          format.currencySymbol
        );
      } else if (format.currencyCode) {
        return this.currencyPipe.transform(value, format.currencyCode);
      } else if (format.currencySymbol) {
        return this.currencyPipe.transform(value, format.currencySymbol);
      } else {
        return this.currencyPipe.transform(value);
      }
    }

    if (format.formatType === 'date') {
      if (format.dateFormat && format.dateTimeZone) {
        return this.datePipe.transform(
          value,
          format.dateFormat,
          format.dateTimeZone
        );
      } else if (format.dateFormat) {
        return this.datePipe.transform(value, format.dateFormat);
      } else if (format.dateTimeZone) {
        return this.datePipe.transform(value, format.dateTimeZone);
      } else {
        return this.datePipe.transform(value);
      }
    }

    if (format.formatType === 'percent') {
      if (format.percentFormat) {
        return this.percentPipe.transform(value, format.percentFormat);
      } else {
        return this.percentPipe.transform(value);
      }
    }

    return value;
  }
}
