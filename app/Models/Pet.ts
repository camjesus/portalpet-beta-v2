export class Pet {
  constructor(
    public name: string, //NO_NAME
    public size: string, //SMALL - MEDIUM - BIG
    public type: string, //DOG - CAT
    public sex: string, //FAMALE - MALE
    public oldMonths: number,
    public oldYears: number,
    public description: string,
    public image: string,
    public acction: string, //ADOPTION - WANTED - FOUND
    public ubication: null // N/A
  ) {}
}
