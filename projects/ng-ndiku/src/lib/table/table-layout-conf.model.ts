export enum TableType {
  MatTable,
  DefaultTable,
}

export class ColumnSetting {
  primaryKey: string;
  header?: string;
  format?: {
    formatType?: string;
    currencySymbol?: string;
    currencyCode?: string;
    dateFormat?: string;
    dateTimeZone?: string;
    percentFormat?: string;
  };
  alternativeKeys?: string[];
  editable?: boolean;
}

export class ColumnMap {
  primaryKey: string;
  private _HEADER: string;
  private _FORMAT: {
    formatType?: string;
    currencySymbol?: string;
    currencyCode?: string;
    dateFormat?: string;
    dateTimeZone?: string;
    percentFormat?: string;
  };
  private _EDITABLE: boolean;
  alternativeKeys?: string[];

  constructor(settings: ColumnSetting) {
    this.primaryKey = settings.primaryKey;
    this.header = settings.header;
    this.format = settings.format;
    this.alternativeKeys = settings.alternativeKeys;
    this.editable = settings.editable;
  }
  set header(setting: string) {
    this._HEADER = setting
      ? setting
      : this.primaryKey.slice(0, 1).toUpperCase() +
        this.primaryKey.replace(/_/g, ' ').slice(1);
  }
  get header() {
    return this._HEADER;
  }
  set format(setting: {
    formatType?: string;
    currencySymbol?: string;
    currencyCode?: string;
    dateFormat?: string;
    dateTimeZone?: string;
    percentFormat?: string;
  }) {
    this._FORMAT = setting ? setting : { formatType: 'default' };
  }
  get format() {
    return this._FORMAT;
  }
  set editable(setting: boolean) {
    this._EDITABLE = setting ? setting : false;
  }
  get editable() {
    return this._EDITABLE;
  }
  access = function(object: any) {
    if (object[this.primaryKey] || !this.alternativeKeys) {
      return this.primaryKey;
    }
    for (const key of this.alternativeKeys) {
      if (object[key]) {
        return key;
      }
    }
    return this.primaryKey;
  };
}
