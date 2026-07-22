import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EChartsCoreOption } from 'echarts/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NgxEchartsDirective } from 'ngx-echarts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NzGridModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzTagModule,
    NzTimelineModule,
    NzAvatarModule,
    NgxEchartsDirective
  ]
})
export class DashboardComponent {
  readonly kpis = [
    {
      title: 'Revenue',
      value: '₹4.8 Cr',
      change: '+18%',
      icon: 'wallet'
    },
    {
      title: 'Orders',
      value: '1,284',
      change: '+11%',
      icon: 'shopping-cart'
    },
    {
      title: 'Customers',
      value: '892',
      change: '+7%',
      icon: 'team'
    },
    {
      title: 'Vendors',
      value: '214',
      change: '+5%',
      icon: 'shop'
    },
    {
      title: 'Products',
      value: '1,546',
      change: '+9%',
      icon: 'appstore'
    },
    {
      title: 'Profit',
      value: '₹86 L',
      change: '+13%',
      icon: 'rise'
    }
  ];
  readonly recentOrders = [
    {
      id: '#ORD-1001',
      customer: 'Rahul Sharma',
      amount: '₹24,500',
      status: 'Completed',
      date: '21 Jul 2026'
    },
    {
      id: '#ORD-1002',
      customer: 'Priya Patel',
      amount: '₹18,200',
      status: 'Pending',
      date: '21 Jul 2026'
    },
    {
      id: '#ORD-1003',
      customer: 'Amit Kumar',
      amount: '₹12,750',
      status: 'Processing',
      date: '20 Jul 2026'
    },
    {
      id: '#ORD-1004',
      customer: 'Sneha Shah',
      amount: '₹45,100',
      status: 'Completed',
      date: '20 Jul 2026'
    },
    {
      id: '#ORD-1005',
      customer: 'Rohan Mehta',
      amount: '₹9,600',
      status: 'Cancelled',
      date: '19 Jul 2026'
    }
  ];

  readonly activities = [
    {
      title: 'New customer added',
      time: '5 min ago'
    },
    {
      title: 'Invoice generated',
      time: '18 min ago'
    },
    {
      title: 'Payment received',
      time: '40 min ago'
    },
    {
      title: 'Vendor created',
      time: '1 hour ago'
    },
    {
      title: 'Inventory updated',
      time: '2 hours ago'
    }
  ];
  readonly revenueChartOption: EChartsCoreOption = {
    grid: {
      top: 20,
      left: 20,
      right: 20,
      bottom: 20,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      axisLine: {
        show: false
      }
    },
    series: [
      {
        name: 'Revenue',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        data: [28, 35, 31, 42, 48, 44, 55, 58, 61, 68, 72, 81],
        lineStyle: {
          width: 4,
          color: '#1677ff'
        },
        itemStyle: {
          color: '#1677ff'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(22,119,255,.35)'
              },
              {
                offset: 1,
                color: 'rgba(22,119,255,.03)'
              }
            ]
          }
        }
      }
    ]
  };
  readonly salesChartOption: EChartsCoreOption = {
    grid: {
      top: 20,
      left: 20,
      right: 20,
      bottom: 20,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#e5e7eb'
        }
      },
      axisLine: {
        show: false
      }
    },
    series: [
      {
        name: 'Orders',
        type: 'bar',
        barWidth: 18,
        data: [120, 160, 145, 182, 210, 240, 225, 260, 290, 310, 345, 380],
        itemStyle: {
          borderRadius: [8, 8, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#4f8cff'
              },
              {
                offset: 1,
                color: '#1677ff'
              }
            ]
          }
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 16,
            shadowColor: 'rgba(22,119,255,.35)'
          }
        }
      }
    ]
  };
}
