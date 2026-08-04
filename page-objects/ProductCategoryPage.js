export class ProductCategoryPage{
    constructor(page){
    this.page = page;
    this.productsList = page.locator('.col-lg-4');
    this.cartInHeader = page.locator('button[routerlink="/dashboard/cart"]');
    this.cartBadge = page.locator('button[routerlink="/dashboard/cart"] label');



    
    }
    async addToCart(productName){
        await this.productsList.filter({hasText:productName}).getByRole('button',{name:' Add To Cart'
        }).click();
    }

   async gotoCart(){
        await this.cartInHeader.click();
    }
    
}