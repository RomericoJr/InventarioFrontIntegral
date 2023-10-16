import { Component, ViewChild } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from '../data';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from "ng-apexcharts"

export type ChartOptions = {
  series: ApexAxisChartSeries,
  chart: ApexChart,
  xaxis: ApexXAxis,
  title: ApexTitleSubtitle,
}

interface productSlides{
  id: number;
  image: string;
}

interface Product{
  id: number;
  price: number;
  name: string;
  stock: number;
  description: string;
  sstate: boolean;
  image: string;
  code: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(){
    this.chartOptions = {
      series :[
        {
          name: "My-series",
          data: [10,41,35,51,49,62,69,91,148]
        }
      ],
      chart : {
        height :350,
        type: "bar"
      },
      title :{
        text: " Ventas del mes"
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
      }
    }
  }



  title= 'Sistema de inventario';

  mostSold: productSlides[] = [
    {
      id: 1,
      image:'https://assets.xboxservices.com/assets/b9/aa/b9aaa0e9-815a-46e0-a3e1-7d20738e08ab.jpg?n=Accessories-Hub_Content-Placement-0_294587_788x444.jpg'
    },
    {
      id: 2,
      image:'https://assets-prd.ignimgs.com/2023/05/30/104888-nintendo-switch-pro-controller-black-angle-1200x675-1685451735109.jpeg'
    },
    {
      id: 3,
      image:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/HPNG2_AV1?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1665002953875'
    }
  ];

  products: Product[]=[
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

  // single!: any[];
  // multi!: any[];

  // view: [number,number] = [700, 400];

  // // options
  // showXAxis = true;
  // showYAxis = true;
  // gradient = false;
  // showLegend = true;
  // showXAxisLabel = true;
  // xAxisLabel = 'Country';
  // showYAxisLabel = true;
  // yAxisLabel = 'Population';

  // colorScheme:any = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };

  // constructor() {
  //   Object.assign(this, { single })
  // }

  // onSelect(event:any) {
  //   console.log(event);
  // }

}
