export class AssetGroup {
  constructor(
    public id: number,
    public name: string
  ) {
  }
}

export class Asset {
  constructor(
    public name: string,
    public currentValue: number,
    public group: AssetGroup
  ) {
  }
}