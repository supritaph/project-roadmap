export class place {
  toLowerCase: any;
  isChecked: boolean;
    constructor(
        public s: string,
       public id: string,
       public barcode: number,
       public brand: string,
       public category_id:number,
       public code:number,
       public currency: number,
       
       public description: string,
       public image_url: string,
       public name: string,
       public weight: number,
       public price: number,
       public type: string,
      public veg_non_veg: string,
 public uom: string,
 public cess: number,
 public cgst: number,
 public igst: number,
 public sgst: number,
 public category:string,
 
     ) {}
 
    }