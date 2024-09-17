export interface IBlocks {
  blocks: IBlock[],
}

export interface IBlock {
  'created_at': string,
  'updated_at': string,
  'address': string,
  'phone1': string,
  'phone1full': string,
  'phone2': string,
  'phone2full': string,
  'workHours': string,
  'email': string,
  'locale': string,
  'warning': string,
  'showWarning': string,
}