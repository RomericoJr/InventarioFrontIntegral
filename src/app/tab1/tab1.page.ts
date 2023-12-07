import { Component, ViewChild } from '@angular/core';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle } from 'ng-apexcharts';
import { ProductService } from '../service/product.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

interface productSlides {
  id: number;
  image: string;
}

interface Product {
  id: number;
  price: number;
  name: string;
  stock: number;
  description: string;
  sstate: boolean;
  image: string;
  code: string;
}

interface Sale {
  amount: number;
  created_at: string;
  hour: string;
  id: number;
  product: {
    category_id: number;
    created_at: string;
    expired: string;
    id: number;
    image: string;
    name: string;
    price: number;
    price_sale: number;
    state: number;
    stock: number;
    updated_at: string;
  };
  product_id: number;
  profit: number;
  total: number;
  updated_at: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  dataSale: Sale[] = [];

  constructor(private _salesS: ProductService) {
    this.getSales();
    this.chartOptions = {
      series: [
        {
          name: 'Productos Más Vendidos',
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: 'bar'
      },
      title: {
        text: 'Productos Más Vendidos'
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
      }
    };
  }

  title = 'Sistema de inventario';

  productss: Product[]=[
    {
      id: 1,
      price: 24,
      name: 'audifonos',
      stock: 3,
      description: 'audifonos Hp',
      sstate: true,
      image: 'https://assets-prd.ignimgs.com/2023/05/30/104888-nintendo-switch-pro-controller-black-angle-1200x675-1685451735109.jpeg',
      code: 'asdfasdf'
    },
    {
      id: 2,
      price: 245,
      name: 'celular',
      stock: 0,
      description: 'Samsung',
      sstate: true,
      image: 'https://assets-prd.ignimgs.com/2023/05/30/104888-nintendo-switch-pro-controller-black-angle-1200x675-1685451735109.jpeg',
      code: 'asdfasdsdf'
    },
    {
      id: 3,
      price: 900,
      name: 'Mouse',
      stock: 0,
      description: 'Logitech',
      sstate: true,
      image: 'https://assets-prd.ignimgs.com/2023/05/30/104888-nintendo-switch-pro-controller-black-angle-1200x675-1685451735109.jpeg',
      code: 'aaa'
    },
  ]
  mostSold: productSlides[] = [
    {
      id: 1,
      image: 'https://assets.xboxservices.com/assets/b9/aa/b9aaa0e9-815a-46e0-a3e1-7d20738e08ab.jpg?n=Accessories-Hub_Content-Placement-0_294587_788x444.jpg'
    },
    {
      id: 2,
      image: 'https://assets-prd.ignimgs.com/2023/05/30/104888-nintendo-switch-pro-controller-black-angle-1200x675-1685451735109.jpeg'
    },
    {
      id: 3,
      image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/HPNG2_AV1?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1665002953875'
    }
  ];

  getSales() {
    this._salesS.getSale().subscribe({
      next: (res: any) => {
        this.dataSale = res;
        console.log(this.dataSale);
        this.updateChart();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  updateChart() {
    const mostSoldData = this.getMostSoldProducts();

    this.chartOptions = {
      series: [
        {
          name: 'Productos Más Vendidos',
          data: mostSoldData.map(product => {
            const salesCount = this.dataSale.filter(sale => sale.product.id === product.id).length;
            return salesCount;
          })
        }
      ],
      chart: {
        height: 350,
        type: 'bar'
      },
      title: {
        text: 'Productos Más Vendidos'
      },
      xaxis: {
        categories: mostSoldData.map(product => product.name)
      }
    };
  }

  getMostSoldProducts(): Product[] {
    const productsWithSales: any[] = this.dataSale.map((sale: Sale) => {
      const { id, name, image } = sale.product;
      return {
        id,
        name,
        image,
        description: '', // Add the missing properties
        sstate: '',
        code: '',
        price: 0, // Add the missing properties
        stock: 0 // Add the missing properties
      };
    });
    const productsGroupedById = this.groupProductsById<Product>(productsWithSales);
    const productsSortedBySales = this.sortProductsBySales(productsGroupedById);
    const mostSoldProducts = productsSortedBySales.slice(0, 3);

    return mostSoldProducts;
  }

  groupProductsById<T extends { id: number }>(objects: T[]): Map<number, T> {
    return objects.reduce((map, obj) => {
      if (!map.has(obj.id)) {
        map.set(obj.id, obj);
      }
      return map;
    }, new Map<number, T>());
  }

  sortProductsBySales(productsMap: Map<number, Product>): Product[] {
    const productsArray = Array.from(productsMap.values());
    return productsArray.sort((a, b) => {
      const salesA = this.dataSale.filter((sale) => sale.product.id === a.id).length;
      const salesB = this.dataSale.filter((sale) => sale.product.id === b.id).length;
      return salesB - salesA;
    });
  }
}
