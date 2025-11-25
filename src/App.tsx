import React, { useState } from 'react';
import { IndianRupee, Route, Star, ArrowRight, TrendingUp, Search, Truck, CheckCircle2, ChevronDown, AlertTriangle, ThumbsUp } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Tab = 'freight' | 'transporter';
type TransporterTab = 'discovery' | 'analyze';

// Freight data
const freightData = [
  {
    origin: 'Chennai',
    destination: 'Bengaluru',
    truckType: 'Closed Truck (32FtMXL 15MT)',
    averageRate: 29000,
    minimumRate: 27500,
    maximumRate: 29000,
    yourAvg: 28500,
    monthlyData: [27500, 28900, 28300, 27700, 28900, 28800, 28900, 28400, 28900, 27900, 28900, 29000, 28900]
  },
  {
    origin: 'Chennai',
    destination: 'Bhiwandi',
    truckType: 'Closed Truck (32FtMXL 15MT)',
    averageRate: 30100,
    minimumRate: 30100,
    maximumRate: 32000,
    yourAvg: 31100,
    monthlyData: [30700, 31000, 31400, 31700, 30700, 31200, 31100, 31400, 32000, 31300, 31300, 31200, 30100]
  },
  {
    origin: 'Chennai',
    destination: 'Gandhinagar',
    truckType: 'Closed Truck (32FtMXL 15MT)',
    averageRate: 53800,
    minimumRate: 48200,
    maximumRate: 55100,
    yourAvg: 52500,
    monthlyData: [48200, 51700, 55100, 50400, 53300, 53000, 53900, 52800, 53800, 51600, 52000, 53700, 53800]
  },
  {
    origin: 'Chennai',
    destination: 'Kolkata',
    truckType: 'Closed Truck (32FtMXL 15MT)',
    averageRate: 99900,
    minimumRate: 83200,
    maximumRate: 110200,
    yourAvg: 97400,
    monthlyData: [83200, 87500, 92400, 97200, 99000, 98300, 100300, 97800, 101300, 100200, 110200, 94100, 97800]
  },
  {
    origin: 'Chennai',
    destination: 'Nagpur',
    truckType: 'Closed Truck (32FtMXL 15MT)',
    averageRate: 54600,
    minimumRate: 53000,
    maximumRate: 59600,
    yourAvg: 55800,
    monthlyData: [56300, 57900, 59600, 56200, 58200, 55900, 54900, 54000, 53000, 54100, 55200, 56200, 56200]
  },
  {
    origin: 'Pune',
    destination: 'Bhiwandi',
    truckType: 'Closed Truck (32FtSXL 7MT)',
    averageRate: 13400,
    minimumRate: 13500,
    maximumRate: 14600,
    yourAvg: 13900,
    monthlyData: [13800, 14200, 14600, 14400, 14300, 14100, 14000, 13800, 13700, 13500, 13500, 13500, 13500]
  },
  {
    origin: 'Bengaluru',
    destination: 'Pune',
    truckType: 'Closed Truck (32FtSXL 7MT)',
    averageRate: 21100,
    minimumRate: 19500,
    maximumRate: 23200,
    yourAvg: 20600,
    monthlyData: [21000, 19800, 23200, 20500, 20900, 20300, 19500, 19500, 19900, 21200, 22400, 21700, 20300]
  },
  {
    origin: 'Bengaluru',
    destination: 'Gurugram',
    truckType: 'Closed Truck (32FtSXL 7MT)',
    averageRate: 65500,
    minimumRate: 60800,
    maximumRate: 69200,
    yourAvg: 65900,
    monthlyData: [60800, 62400, 63900, 65500, 67000, 68600, 65000, 66600, 69200, 68700, 68100, 67600, 61500]
  },
  {
    origin: 'Kochi',
    destination: 'Kolkata',
    truckType: 'Closed Truck (32FtMXL 15MT)',
    averageRate: 114500,
    minimumRate: 107100,
    maximumRate: 118600,
    yourAvg: 113700,
    monthlyData: [107100, 117500, 111300, 112400, 113400, 114000, 114700, 110100, 113600, 113900, 114400, 118600, 118600]
  },
  {
    origin: 'Kochi',
    destination: 'Chennai',
    truckType: 'Closed Truck (32FtMXL 15MT)',
    averageRate: 24000,
    minimumRate: 21800,
    maximumRate: 26300,
    yourAvg: 23600,
    monthlyData: [24000, 23900, 22400, 21800, 24400, 26200, 23000, 22300, 22400, 22100, 26300, 25200, 24200]
  },
  {
    origin: 'Kochi',
    destination: 'Nagpur',
    truckType: 'Closed Truck (32FtMXL 15MT)',
    averageRate: 66000,
    minimumRate: 64500,
    maximumRate: 69000,
    yourAvg: 65500,
    monthlyData: [64500, 64500, 64500, 69000, 66700, 65500, 66000, 68100, 65500, 65000, 65000, 65000, 65000]
  }
];

// Transporter data for analysis
const transporterData = [
  {
    transporter: 'CCI Logistics',
    route: 'Chennai → Bhiwandi',
    origin: 'Chennai',
    destination: 'Bhiwandi',
    truckType: 'Closed Truck (32FtMXL 15MT)',
    requested: 160,
    accepted: 130,
    totalTrips: 125,
    transporterRate: 31500,
    marketRate: 31100,
    onTimeDelivery: 93,
    industryAvgOnTime: 90,
    overallRating: 4.4
  },
  {
    transporter: 'CCI Logistics',
    route: 'Bengaluru → Gurugram',
    origin: 'Bengaluru',
    destination: 'Gurugram',
    truckType: 'Closed Truck (32FtSXL 7MT)',
    requested: 80,
    accepted: 55,
    totalTrips: 50,
    transporterRate: 66500,
    marketRate: 65900,
    onTimeDelivery: 85,
    industryAvgOnTime: 83,
    overallRating: 4.1
  },
  {
    transporter: 'CCI Logistics',
    route: 'Kochi → Kolkata',
    origin: 'Kochi',
    destination: 'Kolkata',
    truckType: 'Closed Truck (32FtMXL 15MT)',
    requested: 45,
    accepted: 30,
    totalTrips: 28,
    transporterRate: 114800,
    marketRate: 113700,
    onTimeDelivery: 88,
    industryAvgOnTime: 85,
    overallRating: 4.2
  },
  {
    transporter: 'SSRC LOGISTICS PVT LTD',
    route: 'Chennai → Nagpur',
    origin: 'Chennai',
    destination: 'Nagpur',
    truckType: 'Closed Truck (32FtMXL 15MT)',
    requested: 95,
    accepted: 85,
    totalTrips: 82,
    transporterRate: 57000,
    marketRate: 55800,
    onTimeDelivery: 96,
    industryAvgOnTime: 91,
    overallRating: 4.6
  },
  {
    transporter: 'SSRC LOGISTICS PVT LTD',
    route: 'Kochi → Chennai',
    origin: 'Kochi',
    destination: 'Chennai',
    truckType: 'Closed Truck (32FtMXL 15MT)',
    requested: 120,
    accepted: 110,
    totalTrips: 108,
    transporterRate: 23800,
    marketRate: 23600,
    onTimeDelivery: 98,
    industryAvgOnTime: 93,
    overallRating: 4.8
  },
  {
    transporter: 'SSRC LOGISTICS PVT LTD',
    route: 'Bengaluru → Pune',
    origin: 'Bengaluru',
    destination: 'Pune',
    truckType: 'Closed Truck (32FtSXL 7MT)',
    requested: 140,
    accepted: 100,
    totalTrips: 95,
    transporterRate: 20700,
    marketRate: 20600,
    onTimeDelivery: 91,
    industryAvgOnTime: 90,
    overallRating: 4.3
  },
  {
    transporter: 'Vijay Logistics Pvt Ltd',
    route: 'Pune → Bhiwandi',
    origin: 'Pune',
    destination: 'Bhiwandi',
    truckType: 'Closed Truck (32FtSXL 7MT)',
    requested: 210,
    accepted: 180,
    totalTrips: 178,
    transporterRate: 14200,
    marketRate: 13900,
    onTimeDelivery: 95,
    industryAvgOnTime: 92,
    overallRating: 4.5
  },
  {
    transporter: 'Vijay Logistics Pvt Ltd',
    route: 'Chennai → Kolkata',
    origin: 'Chennai',
    destination: 'Kolkata',
    truckType: 'Closed Truck (32FtMXL 15MT)',
    requested: 60,
    accepted: 40,
    totalTrips: 35,
    transporterRate: 97000,
    marketRate: 97400,
    onTimeDelivery: 84,
    industryAvgOnTime: 87,
    overallRating: 4.0
  },
  {
    transporter: 'Vijay Logistics Pvt Ltd',
    route: 'Chennai → Gandhinagar',
    origin: 'Chennai',
    destination: 'Gandhinagar',
    truckType: 'Closed Truck (32FtMXL 15MT)',
    requested: 75,
    accepted: 50,
    totalTrips: 47,
    transporterRate: 52700,
    marketRate: 52500,
    onTimeDelivery: 89,
    industryAvgOnTime: 86,
    overallRating: 4.2
  }
];

// Transporter discovery data
const discoveryData = [
  {
    route: 'Chennai → Bhiwandi',
    origin: 'Chennai',
    destination: 'Bhiwandi',
    truckType: 'Closed Truck (32FtMXL 15MT)',
    transporterName: 'CCI Logistics',
    avgRate: 31500,
    onTimeDelivery: 93,
    rating: 4.4,
    totalTripsOnLane: 285,
    monthlyFrequency: '20–25 trips/month',
    rateAnalysis: 'Aligned with market',
    onTimeDeliveryService: 93,
    performanceScore: 8.9,
    routePerformancePercentile: '90th percentile'
  },
  {
    route: 'Chennai → Bhiwandi',
    origin: 'Chennai',
    destination: 'Bhiwandi',
    truckType: 'Closed Truck (32FtMXL 15MT)',
    transporterName: 'Rastus Logistics',
    avgRate: 31000,
    onTimeDelivery: 92,
    rating: 4.4,
    totalTripsOnLane: 285,
    monthlyFrequency: '15–20 trips/month',
    rateAnalysis: 'Slightly better',
    onTimeDeliveryService: 92,
    performanceScore: 8.7,
    routePerformancePercentile: '85th percentile'
  },
  {
    route: 'Chennai → Bhiwandi',
    origin: 'Chennai',
    destination: 'Bhiwandi',
    truckType: 'Closed Truck (32FtMXL 15MT)',
    transporterName: 'MEGA Freight Movers',
    avgRate: 31200,
    onTimeDelivery: 87,
    rating: 4.2,
    totalTripsOnLane: 285,
    monthlyFrequency: '10–15 trips/month',
    rateAnalysis: 'Slightly high',
    onTimeDeliveryService: 87,
    performanceScore: 7.8,
    routePerformancePercentile: '72nd percentile'
  },
  {
    route: 'Chennai → Gandhinagar',
    origin: 'Chennai',
    destination: 'Gandhinagar',
    truckType: 'Closed Truck (32FtMXL 15MT)',
    transporterName: 'SLB Logistics Pvt. Ltd',
    avgRate: 53000,
    onTimeDelivery: 88,
    rating: 4.2,
    totalTripsOnLane: 137,
    monthlyFrequency: '8–10 trips/month',
    rateAnalysis: 'Slightly high',
    onTimeDeliveryService: 88,
    performanceScore: 8.2,
    routePerformancePercentile: '78th percentile'
  },
  {
    route: 'Chennai → Gandhinagar',
    origin: 'Chennai',
    destination: 'Gandhinagar',
    truckType: 'Closed Truck (32FtMXL 15MT)',
    transporterName: 'Express Roadways Pvt.',
    avgRate: 52800,
    onTimeDelivery: 91,
    rating: 4.4,
    totalTripsOnLane: 137,
    monthlyFrequency: '10–12 trips/month',
    rateAnalysis: 'Aligned with market',
    onTimeDeliveryService: 91,
    performanceScore: 8.8,
    routePerformancePercentile: '85th percentile'
  },
  {
    route: 'Chennai → Gandhinagar',
    origin: 'Chennai',
    destination: 'Gandhinagar',
    truckType: 'Closed Truck (32FtMXL 15MT)',
    transporterName: 'Vijay Logistics Pvt. Ltd',
    avgRate: 52700,
    onTimeDelivery: 89,
    rating: 4.2,
    totalTripsOnLane: 137,
    monthlyFrequency: '8–10 trips/month',
    rateAnalysis: 'Aligned with market',
    onTimeDeliveryService: 89,
    performanceScore: 8.3,
    routePerformancePercentile: '80th percentile'
  },
  {
    route: 'Chennai → Kolkata',
    origin: 'Chennai',
    destination: 'Kolkata',
    truckType: 'Closed Truck (32FtMXL 15MT)',
    transporterName: 'SYPS - Saint Gobain',
    avgRate: 96500,
    onTimeDelivery: 94,
    rating: 4.6,
    totalTripsOnLane: 138,
    monthlyFrequency: '10–12 trips/month',
    rateAnalysis: 'Slightly better',
    onTimeDeliveryService: 94,
    performanceScore: 9.1,
    routePerformancePercentile: '90th percentile'
  },
  {
    route: 'Chennai → Kolkata',
    origin: 'Chennai',
    destination: 'Kolkata',
    truckType: 'Closed Truck (32FtMXL 15MT)',
    transporterName: 'Vijay Logistics Pvt. Ltd',
    avgRate: 97000,
    onTimeDelivery: 84,
    rating: 4.0,
    totalTripsOnLane: 138,
    monthlyFrequency: '6–8 trips/month',
    rateAnalysis: 'Slightly high',
    onTimeDeliveryService: 84,
    performanceScore: 7.5,
    routePerformancePercentile: '68th percentile'
  },
  {
    route: 'Chennai → Kolkata',
    origin: 'Chennai',
    destination: 'Kolkata',
    truckType: 'Closed Truck (32FtMXL 15MT)',
    transporterName: 'DB Schenker',
    avgRate: 98200,
    onTimeDelivery: 97,
    rating: 4.8,
    totalTripsOnLane: 138,
    monthlyFrequency: '10–12 trips/month',
    rateAnalysis: 'Premium rate',
    onTimeDeliveryService: 97,
    performanceScore: 9.5,
    routePerformancePercentile: '95th percentile'
  },
  {
    route: 'Bengaluru → Pune',
    origin: 'Bengaluru',
    destination: 'Pune',
    truckType: 'Closed Truck (32FtSXL 7MT)',
    transporterName: 'Delhivery Pvt. Ltd',
    avgRate: 20900,
    onTimeDelivery: 96,
    rating: 4.8,
    totalTripsOnLane: 338,
    monthlyFrequency: '25–30 trips/month',
    rateAnalysis: 'Competitive',
    onTimeDeliveryService: 96,
    performanceScore: 9.7,
    routePerformancePercentile: '95th percentile'
  },
  {
    route: 'Bengaluru → Pune',
    origin: 'Bengaluru',
    destination: 'Pune',
    truckType: 'Closed Truck (32FtSXL 7MT)',
    transporterName: 'SSRC Logistics Pvt. Ltd',
    avgRate: 20700,
    onTimeDelivery: 91,
    rating: 4.0,
    totalTripsOnLane: 338,
    monthlyFrequency: '15–20 trips/month',
    rateAnalysis: 'Aligned with market',
    onTimeDeliveryService: 91,
    performanceScore: 8.6,
    routePerformancePercentile: '85th percentile'
  },
  {
    route: 'Bengaluru → Pune',
    origin: 'Bengaluru',
    destination: 'Pune',
    truckType: 'Closed Truck (32FtSXL 7MT)',
    transporterName: 'CCI Logistics',
    avgRate: 21000,
    onTimeDelivery: 88,
    rating: 4.0,
    totalTripsOnLane: 338,
    monthlyFrequency: '10–15 trips/month',
    rateAnalysis: 'Slightly high',
    onTimeDeliveryService: 88,
    performanceScore: 8.1,
    routePerformancePercentile: '80th percentile'
  }
];

const monthLabels = ['Jan-24', 'Feb-24', 'Mar-24', 'Apr-24', 'May-24', 'Jun-24', 'Jul-24', 'Aug-24', 'Sep-24', 'Oct-24', 'Nov-24', 'Dec-24', 'Jan-25'];

function App() {
  const [mainTab, setMainTab] = useState<Tab>('freight');
  const [transporterTab, setTransporterTab] = useState<TransporterTab>('discovery');
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedTruckType, setSelectedTruckType] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showTransporterResults, setShowTransporterResults] = useState(false);
  const [showDiscoveryResults, setShowDiscoveryResults] = useState(false);
  const [expandedTransporter, setExpandedTransporter] = useState<number | null>(null);
  const [expandedDiscovery, setExpandedDiscovery] = useState<number | null>(null);

  // Transporter analysis filters
  const [transporterOrigin, setTransporterOrigin] = useState('');
  const [transporterDestination, setTransporterDestination] = useState('');
  const [transporterTruckType, setTransporterTruckType] = useState('');

  // Discovery filters
  const [discoveryOrigin, setDiscoveryOrigin] = useState('');
  const [discoveryDestination, setDiscoveryDestination] = useState('');
  const [discoveryTruckType, setDiscoveryTruckType] = useState('');

  // Get unique origins
  const origins = [...new Set(freightData.map(item => item.origin))];
  
  // Get destinations based on selected origin
  const destinations = selectedOrigin 
    ? [...new Set(freightData.filter(item => item.origin === selectedOrigin).map(item => item.destination))]
    : [];
  
  // Get truck types based on selected route
  const truckTypes = selectedOrigin && selectedDestination
    ? [...new Set(freightData.filter(item => item.origin === selectedOrigin && item.destination === selectedDestination).map(item => item.truckType))]
    : [];

  // Transporter analysis filters
  const transporterDestinations = transporterOrigin 
    ? [...new Set(transporterData.filter(item => item.origin === transporterOrigin).map(item => item.destination))]
    : [];
  
  const transporterTruckTypes = transporterOrigin && transporterDestination
    ? [...new Set(transporterData.filter(item => item.origin === transporterOrigin && item.destination === transporterDestination).map(item => item.truckType))]
    : [];

  // Discovery filters
  const discoveryDestinations = discoveryOrigin 
    ? [...new Set(discoveryData.filter(item => item.origin === discoveryOrigin).map(item => item.destination))]
    : [];
  
  const discoveryTruckTypes = discoveryOrigin && discoveryDestination
    ? [...new Set(discoveryData.filter(item => item.origin === discoveryOrigin && item.destination === discoveryDestination).map(item => item.truckType))]
    : [];

  // Get current route data
  const currentRoute = freightData.find(item => 
    item.origin === selectedOrigin && 
    item.destination === selectedDestination && 
    item.truckType === selectedTruckType
  );

  const handleAnalyze = () => {
    if (currentRoute) {
      setShowResults(true);
    }
  };

  const handleTransporterAnalyze = () => {
    if (transporterOrigin && transporterDestination && transporterTruckType) {
      setShowTransporterResults(true);
    }
  };

  const handleDiscoveryAnalyze = () => {
    if (discoveryOrigin && discoveryDestination && discoveryTruckType) {
      setShowDiscoveryResults(true);
    }
  };

  const rateData = currentRoute ? {
    labels: monthLabels,
    datasets: [
      {
        label: 'Market Rate',
        data: currentRoute.monthlyData,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        borderWidth: 3,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Your Average',
        data: Array(13).fill(currentRoute.yourAvg),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
        borderWidth: 3,
        borderDash: [8, 4],
        pointBackgroundColor: '#10B981',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4,
        fill: true,
      }
    ]
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 14,
            weight: 'bold' as const
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ₹${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            weight: 'normal' as const
          },
          color: '#6B7280'
        }
      },
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
        ticks: {
          font: {
            size: 12,
            weight: 'normal' as const
          },
          color: '#6B7280',
          callback: function(value: any) {
            return '₹' + value.toLocaleString();
          }
        }
      },
    },
    elements: {
      point: {
        hoverBorderWidth: 3,
      }
    }
  };

  const getCompetitivenessData = (yourRate: number, marketRate: number) => {
    const diff = ((yourRate - marketRate) / marketRate) * 100;
    
    if (diff <= -3) {
      return {
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: ThumbsUp,
        iconColor: 'text-green-600',
        text: 'Highly Competitive',
        description: 'Your rates are significantly below market average',
        percentage: diff.toFixed(1)
      };
    } else if (diff <= -1) {
      return {
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: ThumbsUp,
        iconColor: 'text-green-600',
        text: 'Competitive',
        description: 'Your rates are below market average',
        percentage: diff.toFixed(1)
      };
    } else if (diff <= 2) {
      return {
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        icon: TrendingUp,
        iconColor: 'text-yellow-600',
        text: 'Market Rate',
        description: 'Your rates are aligned with market average',
        percentage: diff.toFixed(1)
      };
    } else if (diff <= 5) {
      return {
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        icon: AlertTriangle,
        iconColor: 'text-orange-600',
        text: 'Above Market',
        description: 'Your rates are moderately above market average',
        percentage: diff.toFixed(1)
      };
    } else {
      return {
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: AlertTriangle,
        iconColor: 'text-red-600',
        text: 'High Cost',
        description: 'Your rates are significantly above market average',
        percentage: diff.toFixed(1)
      };
    }
  };

  // Filter discovery data based on selected route and truck type
  const filteredDiscoveryData = discoveryOrigin && discoveryDestination && discoveryTruckType
    ? discoveryData.filter(item => 
        item.origin === discoveryOrigin && 
        item.destination === discoveryDestination && 
        item.truckType === discoveryTruckType
      )
    : [];

  // Filter transporter data based on selected filters
  const filteredTransporterData = transporterOrigin && transporterDestination && transporterTruckType
    ? transporterData.filter(item => 
        item.origin === transporterOrigin && 
        item.destination === transporterDestination && 
        item.truckType === transporterTruckType
      )
    : [];

  return (
    <div className="min-h-screen">
      {/* Modern Header with Glassmorphism */}
      <header className="sticky top-0 z-50 glass border-b border-white/20 shadow-lg shadow-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 group">
              <div className="p-2.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110">
                <Route size={26} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Freight Intelligence Hub
                </h1>
                <p className="text-xs text-slate-500">Real-time logistics insights</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Modern Design */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-purple-600/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6bTAtOHYyaDJ2LTJoLTJ6bS0yIDJ2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yem0wLTh2Mmgydi0yaC0yem0tMiAydjJoMnYtMmgtMnptMCA0djJoMnYtMmgtMnptMC04djJoMnYtMmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/80 backdrop-blur-sm rounded-full text-blue-700 text-sm font-medium mb-6 shadow-lg">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              Powered by Real-Time Market Data
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
              Optimize Your Logistics with
              <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                Data-Driven Insights
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Make informed decisions with comprehensive freight rate analysis and transporter performance metrics. 
              Benchmark your logistics operations against market standards and discover opportunities for optimization.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 glass-strong rounded-xl">
                <CheckCircle2 size={20} className="text-green-600" />
                <span className="text-sm font-medium text-slate-700">Real-time rates</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 glass-strong rounded-xl">
                <CheckCircle2 size={20} className="text-green-600" />
                <span className="text-sm font-medium text-slate-700">Verified transporters</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 glass-strong rounded-xl">
                <CheckCircle2 size={20} className="text-green-600" />
                <span className="text-sm font-medium text-slate-700">24/7 tracking</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Modern Tab Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 animate-slide-up">
          <button
            className={`group relative overflow-hidden rounded-2xl transition-all duration-500 p-8 card-hover ${
              mainTab === 'freight'
                ? 'glass-strong shadow-2xl shadow-blue-500/20 ring-2 ring-blue-500'
                : 'glass hover:shadow-xl'
            }`}
            onClick={() => setMainTab('freight')}
          >
            {mainTab === 'freight' && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10"></div>
            )}
            <div className="relative flex items-start gap-5">
              <div className={`p-4 rounded-2xl transition-all duration-300 ${
                mainTab === 'freight' 
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/50 scale-110' 
                  : 'bg-slate-100 group-hover:bg-blue-50 group-hover:scale-110'
              }`}>
                <TrendingUp size={28} className={mainTab === 'freight' ? 'text-white' : 'text-slate-600 group-hover:text-blue-600'} />
              </div>
              <div className="text-left flex-1">
                <h3 className={`text-xl font-bold mb-2 transition-colors ${
                  mainTab === 'freight' ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'
                }`}>
                  Freight Benchmarking
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Analyze freight rates, compare market trends, and optimize your shipping costs with real-time data
                </p>
                {mainTab === 'freight' && (
                  <div className="mt-4 inline-flex items-center gap-2 text-blue-600 text-sm font-semibold">
                    Active <ArrowRight size={16} />
                  </div>
                )}
              </div>
            </div>
          </button>

          <button
            className={`group relative overflow-hidden rounded-2xl transition-all duration-500 p-8 card-hover ${
              mainTab === 'transporter'
                ? 'glass-strong shadow-2xl shadow-blue-500/20 ring-2 ring-blue-500'
                : 'glass hover:shadow-xl'
            }`}
            onClick={() => setMainTab('transporter')}
          >
            {mainTab === 'transporter' && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10"></div>
            )}
            <div className="relative flex items-start gap-5">
              <div className={`p-4 rounded-2xl transition-all duration-300 ${
                mainTab === 'transporter' 
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/50 scale-110' 
                  : 'bg-slate-100 group-hover:bg-blue-50 group-hover:scale-110'
              }`}>
                <Truck size={28} className={mainTab === 'transporter' ? 'text-white' : 'text-slate-600 group-hover:text-blue-600'} />
              </div>
              <div className="text-left flex-1">
                <h3 className={`text-xl font-bold mb-2 transition-colors ${
                  mainTab === 'transporter' ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'
                }`}>
                  Transporter Benchmarking
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Evaluate transporter performance, discover reliable partners, and optimize your network
                </p>
                {mainTab === 'transporter' && (
                  <div className="mt-4 inline-flex items-center gap-2 text-blue-600 text-sm font-semibold">
                    Active <ArrowRight size={16} />
                  </div>
                )}
              </div>
            </div>
          </button>
        </div>

        {mainTab === 'freight' && (
          <>
            {/* Modern Rate Analysis Form */}
            <div className="glass-strong rounded-2xl shadow-2xl p-8 lg:p-10 mb-8 animate-scale-in border border-white/60">
              <div className="section-header">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/30">
                  <Search size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">Rate Discovery</h2>
                  <p className="text-sm text-slate-500 mt-1">Find competitive freight rates for your route</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Route size={18} className="text-blue-600" />
                    Origin City
                  </label>
                  <select 
                    className="input-modern"
                    value={selectedOrigin}
                    onChange={(e) => {
                      setSelectedOrigin(e.target.value);
                      setSelectedDestination('');
                      setSelectedTruckType('');
                      setShowResults(false);
                    }}
                  >
                    <option value="">Select Origin City</option>
                    {origins.map((origin) => (
                      <option key={origin} value={origin}>
                        {origin}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Route size={18} className="text-blue-600" />
                    Destination City
                  </label>
                  <select 
                    className="input-modern disabled:opacity-40 disabled:cursor-not-allowed"
                    value={selectedDestination}
                    onChange={(e) => {
                      setSelectedDestination(e.target.value);
                      setSelectedTruckType('');
                      setShowResults(false);
                    }}
                    disabled={!selectedOrigin}
                  >
                    <option value="">Select Destination City</option>
                    {destinations.map((destination) => (
                      <option key={destination} value={destination}>
                        {destination}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Truck size={18} className="text-blue-600" />
                    Truck Type
                  </label>
                  <select 
                    className="input-modern disabled:opacity-40 disabled:cursor-not-allowed"
                    value={selectedTruckType}
                    onChange={(e) => {
                      setSelectedTruckType(e.target.value);
                      setShowResults(false);
                    }}
                    disabled={!selectedDestination}
                  >
                    <option value="">Select Truck Type</option>
                    {truckTypes.map((truckType) => (
                      <option key={truckType} value={truckType}>
                        {truckType}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                className="btn-primary w-full shine text-lg"
                onClick={handleAnalyze}
                disabled={!selectedTruckType}
              >
                <span className="flex items-center justify-center gap-3">
                  <TrendingUp size={22} />
                  Analyze Freight Rates
                  <ArrowRight size={22} />
                </span>
              </button>
            </div>

            {/* Results */}
            {showResults && currentRoute && (
              <div className="space-y-8 animate-fade-in">
                <div className="result-card">
                  <div className="section-header">
                    <h3 className="text-2xl font-extrabold text-slate-900">Market Rate Analysis</h3>
                    <span className="ml-auto badge badge-info">{currentRoute.origin} → {currentRoute.destination}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div 
                      className="metric-card"
                      style={{ '--gradient-from': '#3b82f6', '--gradient-to': '#1d4ed8' } as React.CSSProperties}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-100 rounded-xl">
                          <IndianRupee size={24} className="text-blue-600" />
                        </div>
                        <span className="badge badge-info text-xs">Minimum</span>
                      </div>
                      <div className="text-3xl lg:text-4xl font-black text-slate-900 mb-2">₹{currentRoute.minimumRate.toLocaleString()}</div>
                      <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Lowest rate in period</div>
                    </div>
                    <div 
                      className="metric-card"
                      style={{ '--gradient-from': '#8b5cf6', '--gradient-to': '#6d28d9' } as React.CSSProperties}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-purple-100 rounded-xl">
                          <IndianRupee size={24} className="text-purple-600" />
                        </div>
                        <span className="badge text-xs bg-purple-100 text-purple-700 ring-2 ring-purple-500/20">Maximum</span>
                      </div>
                      <div className="text-3xl lg:text-4xl font-black text-slate-900 mb-2">₹{currentRoute.maximumRate.toLocaleString()}</div>
                      <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Peak rate in period</div>
                    </div>
                    <div 
                      className="metric-card"
                      style={{ '--gradient-from': '#10b981', '--gradient-to': '#059669' } as React.CSSProperties}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-100 rounded-xl">
                          <IndianRupee size={24} className="text-green-600" />
                        </div>
                        <span className="badge badge-success text-xs">Average</span>
                      </div>
                      <div className="text-3xl lg:text-4xl font-black text-slate-900 mb-2">₹{currentRoute.averageRate.toLocaleString()}</div>
                      <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Market benchmark</div>
                    </div>
                    <div 
                      className="metric-card"
                      style={{ '--gradient-from': '#f59e0b', '--gradient-to': '#d97706' } as React.CSSProperties}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-orange-100 rounded-xl">
                          <IndianRupee size={24} className="text-orange-600" />
                        </div>
                        <span className="badge text-xs bg-orange-100 text-orange-700 ring-2 ring-orange-500/20">Your Rate</span>
                      </div>
                      <div className="text-3xl lg:text-4xl font-black text-slate-900 mb-2">₹{currentRoute.yourAvg.toLocaleString()}</div>
                      <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Your current rate</div>
                    </div>
                  </div>

                  {/* Enhanced Rate Competitiveness */}
                  <div className="glass rounded-2xl p-8 mb-8 border border-slate-100">
                    <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <TrendingUp size={24} className="text-blue-600" />
                      Rate Competitiveness Analysis
                    </h4>
                    {(() => {
                      const competitiveness = getCompetitivenessData(currentRoute.yourAvg, currentRoute.averageRate);
                      const IconComponent = competitiveness.icon;
                      
                      return (
                        <div className={`${competitiveness.bgColor} ${competitiveness.borderColor} border-2 rounded-2xl p-8 shadow-lg`}>
                          <div className="flex items-start gap-6">
                            <div className="p-4 bg-white rounded-2xl shadow-lg">
                              <IconComponent size={32} className={competitiveness.iconColor} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-3">
                                <h5 className={`text-2xl font-black ${competitiveness.color}`}>
                                  {competitiveness.text}
                                </h5>
                                <span className={`px-4 py-2 rounded-xl text-base font-black bg-white shadow-md ${competitiveness.color}`}>
                                  {competitiveness.percentage}%
                                </span>
                              </div>
                              <p className="text-slate-700 text-lg mb-6 font-medium">{competitiveness.description}</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
                                  <div className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">Your Rate</div>
                                  <div className="text-2xl font-black text-slate-900">₹{currentRoute.yourAvg.toLocaleString()}</div>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
                                  <div className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">Market Average</div>
                                  <div className="text-2xl font-black text-slate-900">₹{currentRoute.averageRate.toLocaleString()}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Additional Performance Insights */}
                  <div className="glass rounded-2xl p-8 border border-slate-100">
                    <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <CheckCircle2 size={24} className="text-indigo-600" />
                      Additional Route Insights
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <TrendingUp size={20} className="text-blue-600" />
                          </div>
                          <div className="text-sm font-bold text-blue-700 uppercase tracking-wide">Rate Range</div>
                        </div>
                        <div className="text-3xl font-black text-slate-900 mb-2">
                          ₹{(currentRoute.maximumRate - currentRoute.minimumRate).toLocaleString()}
                        </div>
                        <div className="text-sm font-semibold text-blue-600">min-max spread</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <AlertTriangle size={20} className="text-purple-600" />
                          </div>
                          <div className="text-sm font-bold text-purple-700 uppercase tracking-wide">Rate Volatility</div>
                        </div>
                        <div className="text-3xl font-black text-slate-900 mb-2">
                          {(((currentRoute.maximumRate - currentRoute.minimumRate) / currentRoute.averageRate) * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm font-semibold text-purple-600">price variation</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rate Trend Graph */}
                <div className="result-card">
                  <div className="section-header">
                    <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/30">
                      <TrendingUp size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-900">Rate Trends</h3>
                      <p className="text-sm text-slate-500 mt-1">{currentRoute.origin} → {currentRoute.destination}</p>
                    </div>
                  </div>
                  <div className="h-80 lg:h-96">
                    <Line options={chartOptions} data={rateData!} />
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {mainTab === 'transporter' && (
          <>
            {/* Transporter Sub-tabs */}
            <div className="glass-strong p-2 rounded-2xl shadow-lg mb-8 border border-white/60">
              <div className="flex gap-3">
                <button
                  className={`tab-button flex-1 flex items-center justify-center gap-3 ${
                    transporterTab === 'discovery'
                      ? 'tab-button-active'
                      : 'tab-button-inactive'
                  }`}
                  onClick={() => setTransporterTab('discovery')}
                >
                  <Search size={22} />
                  <span className="font-bold">Transporter Discovery</span>
                </button>
                <button
                  className={`tab-button flex-1 flex items-center justify-center gap-3 ${
                    transporterTab === 'analyze'
                      ? 'tab-button-active'
                      : 'tab-button-inactive'
                  }`}
                  onClick={() => setTransporterTab('analyze')}
                >
                  <Truck size={22} />
                  <span className="font-bold">Analyze Performance</span>
                </button>
              </div>
            </div>

            {transporterTab === 'discovery' && (
              <>
                {/* Discovery Form */}
                <div className="glass-strong rounded-2xl shadow-2xl p-8 lg:p-10 mb-8 animate-scale-in border border-white/60">
                  <div className="section-header">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg shadow-green-500/30">
                      <Search size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-extrabold text-slate-900">Transporter Discovery</h2>
                      <p className="text-sm text-slate-500 mt-1">Find reliable transporters for your route</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Route size={18} className="text-green-600" />
                        Origin City
                      </label>
                      <select 
                        className="input-modern"
                        value={discoveryOrigin}
                        onChange={(e) => {
                          setDiscoveryOrigin(e.target.value);
                          setDiscoveryDestination('');
                          setDiscoveryTruckType('');
                          setShowDiscoveryResults(false);
                        }}
                      >
                        <option value="">Select Origin</option>
                        {origins.map((origin) => (
                          <option key={origin} value={origin}>
                            {origin}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Route size={18} className="text-green-600" />
                        Destination City
                      </label>
                      <select 
                        className="input-modern disabled:opacity-40 disabled:cursor-not-allowed"
                        value={discoveryDestination}
                        onChange={(e) => {
                          setDiscoveryDestination(e.target.value);
                          setDiscoveryTruckType('');
                          setShowDiscoveryResults(false);
                        }}
                        disabled={!discoveryOrigin}
                      >
                        <option value="">Select Destination</option>
                        {discoveryDestinations.map((destination) => (
                          <option key={destination} value={destination}>
                            {destination}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Truck size={18} className="text-green-600" />
                        Vehicle Type
                      </label>
                      <select 
                        className="input-modern disabled:opacity-40 disabled:cursor-not-allowed"
                        value={discoveryTruckType}
                        onChange={(e) => {
                          setDiscoveryTruckType(e.target.value);
                          setShowDiscoveryResults(false);
                        }}
                        disabled={!discoveryDestination}
                      >
                        <option value="">Select Vehicle Type</option>
                        {discoveryTruckTypes.map((truckType) => (
                          <option key={truckType} value={truckType}>
                            {truckType}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    className="btn-primary w-full shine text-lg"
                    onClick={handleDiscoveryAnalyze}
                    disabled={!discoveryTruckType}
                  >
                    <span className="flex items-center justify-center gap-3">
                      <Search size={22} />
                      Find Transporters
                      <ArrowRight size={22} />
                    </span>
                  </button>
                </div>

                {/* Discovery Results */}
                {showDiscoveryResults && filteredDiscoveryData.length > 0 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="result-card">
                      <div className="section-header">
                        <h3 className="text-2xl font-extrabold text-slate-900">Available Transporters</h3>
                        <span className="ml-auto badge badge-success">{discoveryOrigin} → {discoveryDestination}</span>
                      </div>
                      <div className="space-y-6">
                        {filteredDiscoveryData.map((transporter, index) => (
                          <div key={index} className="glass-strong rounded-2xl overflow-hidden border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <div className="p-6 lg:p-8 bg-gradient-to-br from-slate-50/80 to-blue-50/80 backdrop-blur-sm">
                              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6">
                                <div>
                                  <h4 className="font-black text-xl lg:text-2xl text-slate-900 mb-2">{transporter.transporterName}</h4>
                                  <p className="text-base font-semibold text-slate-600 mb-1">{transporter.route}</p>
                                  <p className="text-sm font-medium text-slate-500 inline-flex items-center gap-2">
                                    <Truck size={16} />
                                    {transporter.truckType}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2 bg-gradient-to-br from-yellow-50 to-orange-50 px-4 py-2 rounded-xl shadow-md border-2 border-yellow-200">
                                  <Star className="text-yellow-500 fill-current" size={24} />
                                  <span className="font-black text-lg text-slate-900">{transporter.rating}/5</span>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                                <div className="bg-white p-4 rounded-xl shadow-md border border-blue-100">
                                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Avg. Rate</p>
                                  <p className="font-black text-xl text-blue-600">₹{transporter.avgRate.toLocaleString()}</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-md border border-green-100">
                                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">On-time</p>
                                  <p className="font-black text-xl text-green-600">{transporter.onTimeDelivery}%</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-md border border-purple-100">
                                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Monthly</p>
                                  <p className="font-black text-base text-purple-600">{transporter.monthlyFrequency}</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-md border border-orange-100">
                                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Score</p>
                                  <p className="font-black text-xl text-orange-600">{transporter.performanceScore}/10</p>
                                </div>
                              </div>
                              <button
                                className="mt-6 w-full bg-white hover:bg-blue-50 text-blue-600 font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 border-2 border-blue-100 hover:border-blue-300"
                                onClick={() => setExpandedDiscovery(expandedDiscovery === index ? null : index)}
                              >
                                {expandedDiscovery === index ? 'Hide' : 'View'} Detailed Analytics
                                <ChevronDown
                                  size={20}
                                  className={`transform transition-transform duration-300 ${
                                    expandedDiscovery === index ? 'rotate-180' : ''
                                  }`}
                                />
                              </button>
                            </div>
                            {expandedDiscovery === index && (
                              <div className="border-t-2 border-blue-100 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 p-8 lg:p-10 animate-scale-in">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                  <div>
                                    <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-200">
                                      <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                                        <TrendingUp size={24} className="text-white" />
                                      </div>
                                      <h5 className="text-xl font-black text-slate-900">Performance Metrics</h5>
                                    </div>
                                    <div className="space-y-6">
                                      <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-blue-100 hover:shadow-xl transition-shadow">
                                        <div className="flex items-center justify-between mb-4">
                                          <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">Total Trips on Lane</p>
                                          <div className="p-2.5 bg-blue-50 rounded-xl">
                                            <Truck size={20} className="text-blue-600" />
                                          </div>
                                        </div>
                                        <p className="font-black text-3xl text-slate-900 mb-3">{transporter.totalTripsOnLane}</p>
                                        <div className="flex items-center gap-3">
                                          <div className="progress-bar flex-1">
                                            <div 
                                              className="progress-fill bg-gradient-to-r from-blue-500 to-indigo-600" 
                                              style={{ width: `${Math.min((transporter.totalTripsOnLane / 400) * 100, 100)}%` }}
                                            ></div>
                                          </div>
                                          <span className="text-sm font-bold text-slate-600">{Math.min((transporter.totalTripsOnLane / 400) * 100, 100).toFixed(0)}%</span>
                                        </div>
                                      </div>
                                      
                                      <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-100 hover:shadow-xl transition-shadow">
                                        <div className="flex items-center justify-between mb-4">
                                          <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">Route Performance</p>
                                          <div className="p-2.5 bg-purple-50 rounded-xl">
                                            <Star size={20} className="text-purple-600" />
                                          </div>
                                        </div>
                                        <p className="font-black text-3xl text-slate-900 mb-3">{transporter.routePerformancePercentile}</p>
                                        <div className="flex items-center gap-3">
                                          <div className="progress-bar flex-1">
                                            <div 
                                              className="progress-fill bg-gradient-to-r from-purple-500 to-pink-600" 
                                              style={{ width: `${parseInt(transporter.routePerformancePercentile)}%` }}
                                            ></div>
                                          </div>
                                          <span className="text-sm font-bold text-slate-600">{parseInt(transporter.routePerformancePercentile)}%</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-indigo-200">
                                      <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                                        <CheckCircle2 size={24} className="text-white" />
                                      </div>
                                      <h5 className="text-xl font-black text-slate-900">Service Analysis</h5>
                                    </div>
                                    <div className="space-y-6">
                                      <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-green-100 hover:shadow-xl transition-shadow">
                                        <div className="flex items-center justify-between mb-4">
                                          <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">Rate Analysis</p>
                                          <div className="p-2.5 bg-green-50 rounded-xl">
                                            <IndianRupee size={20} className="text-green-600" />
                                          </div>
                                        </div>
                                        <p className="font-black text-2xl text-slate-900 mb-2">{transporter.rateAnalysis}</p>
                                        <div className="text-base font-semibold text-green-600">
                                          ₹{transporter.avgRate.toLocaleString()} average rate
                                        </div>
                                      </div>
                                      
                                      <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-orange-100 hover:shadow-xl transition-shadow">
                                        <div className="flex items-center justify-between mb-4">
                                          <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">Performance Score</p>
                                          <div className="p-2.5 bg-orange-50 rounded-xl">
                                            <TrendingUp size={20} className="text-orange-600" />
                                          </div>
                                        </div>
                                        <div className="flex items-baseline gap-2 mb-3">
                                          <p className="font-black text-3xl text-slate-900">{transporter.performanceScore}/10</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <div className="progress-bar flex-1">
                                            <div 
                                              className="progress-fill bg-gradient-to-r from-orange-500 to-red-600" 
                                              style={{ width: `${(transporter.performanceScore / 10) * 100}%` }}
                                            ></div>
                                          </div>
                                          <span className="text-sm font-bold text-slate-600">{((transporter.performanceScore / 10) * 100).toFixed(0)}%</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {transporterTab === 'analyze' && (
              <>
                {/* Transporter Analysis Form */}
                <div className="glass-strong rounded-2xl shadow-2xl p-8 lg:p-10 mb-8 animate-scale-in border border-white/60">
                  <div className="section-header">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg shadow-purple-500/30">
                      <Truck size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-extrabold text-slate-900">Analyze Transporter Performance</h2>
                      <p className="text-sm text-slate-500 mt-1">Evaluate your existing transporters</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Route size={18} className="text-purple-600" />
                        Origin City
                      </label>
                      <select 
                        className="input-modern"
                        value={transporterOrigin}
                        onChange={(e) => {
                          setTransporterOrigin(e.target.value);
                          setTransporterDestination('');
                          setTransporterTruckType('');
                          setShowTransporterResults(false);
                        }}
                      >
                        <option value="">Select Origin</option>
                        {origins.map((origin) => (
                          <option key={origin} value={origin}>
                            {origin}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Route size={18} className="text-purple-600" />
                        Destination City
                      </label>
                      <select 
                        className="input-modern disabled:opacity-40 disabled:cursor-not-allowed"
                        value={transporterDestination}
                        onChange={(e) => {
                          setTransporterDestination(e.target.value);
                          setTransporterTruckType('');
                          setShowTransporterResults(false);
                        }}
                        disabled={!transporterOrigin}
                      >
                        <option value="">Select Destination</option>
                        {transporterDestinations.map((destination) => (
                          <option key={destination} value={destination}>
                            {destination}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Truck size={18} className="text-purple-600" />
                        Vehicle Type
                      </label>
                      <select 
                        className="input-modern disabled:opacity-40 disabled:cursor-not-allowed"
                        value={transporterTruckType}
                        onChange={(e) => {
                          setTransporterTruckType(e.target.value);
                          setShowTransporterResults(false);
                        }}
                        disabled={!transporterDestination}
                      >
                        <option value="">Select Vehicle Type</option>
                        {transporterTruckTypes.map((truckType) => (
                          <option key={truckType} value={truckType}>
                            {truckType}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button 
                    className="btn-primary w-full shine text-lg"
                    onClick={handleTransporterAnalyze}
                    disabled={!transporterTruckType}
                  >
                    <span className="flex items-center justify-center gap-3">
                      <TrendingUp size={22} />
                      Analyze Performance
                      <ArrowRight size={22} />
                    </span>
                  </button>
                </div>

                {/* Transporter Results */}
                {showTransporterResults && filteredTransporterData.length > 0 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="result-card">
                      <div className="section-header">
                        <h3 className="text-2xl font-extrabold text-slate-900">Transporter Performance Analysis</h3>
                        <span className="ml-auto badge text-xs bg-purple-100 text-purple-700 ring-2 ring-purple-500/20">{transporterOrigin} → {transporterDestination}</span>
                      </div>
                      <div className="space-y-6">
                        {filteredTransporterData.map((transporter, index) => (
                          <div key={index} className="glass-strong rounded-2xl overflow-hidden border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <div className="p-6 lg:p-8 bg-gradient-to-br from-purple-50/80 to-pink-50/80 backdrop-blur-sm">
                              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6">
                                <div>
                                  <h4 className="font-black text-xl lg:text-2xl text-slate-900 mb-2">{transporter.transporter}</h4>
                                  <p className="text-base font-semibold text-slate-600 mb-1">{transporter.route}</p>
                                  <p className="text-sm font-medium text-slate-500 inline-flex items-center gap-2">
                                    <Truck size={16} />
                                    {transporter.truckType}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2 bg-gradient-to-br from-yellow-50 to-orange-50 px-4 py-2 rounded-xl shadow-md border-2 border-yellow-200">
                                  <Star className="text-yellow-500 fill-current" size={24} />
                                  <span className="font-black text-lg text-slate-900">{transporter.overallRating}/5</span>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                                <div className="bg-white p-4 rounded-xl shadow-md border border-blue-100">
                                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Their Rate</p>
                                  <p className="font-black text-lg text-blue-600">₹{transporter.transporterRate.toLocaleString()}</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-md border border-purple-100">
                                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Market</p>
                                  <p className="font-black text-lg text-purple-600">₹{transporter.marketRate.toLocaleString()}</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-md border border-green-100">
                                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">On-time</p>
                                  <p className="font-black text-lg text-green-600">{transporter.onTimeDelivery}%</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-md border border-orange-100">
                                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Trips</p>
                                  <p className="font-black text-lg text-orange-600">{transporter.totalTrips}</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-md border border-indigo-100">
                                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Accept %</p>
                                  <p className="font-black text-lg text-indigo-600">{Math.round((transporter.accepted / transporter.requested) * 100)}%</p>
                                </div>
                              </div>
                              <button
                                className="mt-6 w-full bg-white hover:bg-purple-50 text-purple-600 font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 border-2 border-purple-100 hover:border-purple-300"
                                onClick={() => setExpandedTransporter(expandedTransporter === index ? null : index)}
                              >
                                {expandedTransporter === index ? 'Hide' : 'View'} Detailed Analysis
                                <ChevronDown
                                  size={20}
                                  className={`transform transition-transform duration-300 ${
                                    expandedTransporter === index ? 'rotate-180' : ''
                                  }`}
                                />
                              </button>
                            </div>
                            {expandedTransporter === index && (
                              <div className="border-t-2 border-purple-100 bg-gradient-to-br from-purple-50/80 to-pink-50/80 p-8 lg:p-10 animate-scale-in">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                  <div>
                                    <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-200">
                                      <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg">
                                        <IndianRupee size={24} className="text-white" />
                                      </div>
                                      <h5 className="text-xl font-black text-slate-900">Rate Analysis</h5>
                                    </div>
                                    <div className="space-y-6">
                                      <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-blue-100 hover:shadow-xl transition-shadow">
                                        <div className="flex items-center justify-between mb-4">
                                          <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">Rate vs Market</p>
                                          <div className="p-2.5 bg-blue-50 rounded-xl">
                                            <TrendingUp size={20} className="text-blue-600" />
                                          </div>
                                        </div>
                                        <div className="flex items-baseline gap-3 mb-3">
                                          <p className={`font-black text-3xl ${
                                            transporter.transporterRate > transporter.marketRate ? 'text-red-600' : 'text-green-600'
                                          }`}>
                                            {((transporter.transporterRate - transporter.marketRate) / transporter.marketRate * 100).toFixed(1)}%
                                          </p>
                                          <p className="text-base font-semibold text-slate-500">
                                            {transporter.transporterRate > transporter.marketRate ? 'above' : 'below'} market
                                          </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <div className="progress-bar flex-1">
                                            <div 
                                              className={`progress-fill ${
                                                transporter.transporterRate > transporter.marketRate 
                                                  ? 'bg-gradient-to-r from-red-500 to-red-600' 
                                                  : 'bg-gradient-to-r from-green-500 to-green-600'
                                              }`}
                                              style={{ 
                                                width: `${Math.min(Math.abs((transporter.transporterRate - transporter.marketRate) / transporter.marketRate * 100) * 10, 100)}%` 
                                              }}
                                            ></div>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-100 hover:shadow-xl transition-shadow">
                                        <div className="flex items-center justify-between mb-4">
                                          <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">Trip Completion</p>
                                          <div className="p-2.5 bg-purple-50 rounded-xl">
                                            <CheckCircle2 size={20} className="text-purple-600" />
                                          </div>
                                        </div>
                                        <p className="font-black text-3xl text-slate-900 mb-3">
                                          {Math.round((transporter.totalTrips / transporter.accepted) * 100)}%
                                        </p>
                                        <div className="flex items-center gap-3">
                                          <div className="progress-bar flex-1">
                                            <div 
                                              className="progress-fill bg-gradient-to-r from-purple-500 to-purple-600" 
                                              style={{ width: `${Math.round((transporter.totalTrips / transporter.accepted) * 100)}%` }}
                                            ></div>
                                          </div>
                                          <span className="text-sm font-bold text-slate-600">
                                            {transporter.totalTrips}/{transporter.accepted}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-indigo-200">
                                      <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                                        <CheckCircle2 size={24} className="text-white" />
                                      </div>
                                      <h5 className="text-xl font-black text-slate-900">Performance Metrics</h5>
                                    </div>
                                    <div className="space-y-6">
                                      <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-green-100 hover:shadow-xl transition-shadow">
                                        <div className="flex items-center justify-between mb-4">
                                          <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">On-time Delivery</p>
                                          <div className="p-2.5 bg-green-50 rounded-xl">
                                            <Truck size={20} className="text-green-600" />
                                          </div>
                                        </div>
                                        <p className="font-black text-3xl text-slate-900 mb-3">{transporter.onTimeDelivery}%</p>
                                        <div className="flex items-center gap-3 mb-3">
                                          <div className="progress-bar flex-1">
                                            <div 
                                              className="progress-fill bg-gradient-to-r from-green-500 to-emerald-600" 
                                              style={{ width: `${transporter.onTimeDelivery}%` }}
                                            ></div>
                                          </div>
                                          <span className="text-sm font-bold text-slate-600">{transporter.onTimeDelivery}%</span>
                                        </div>
                                        <p className="text-sm font-semibold text-slate-500 flex items-center gap-2">
                                          <span className="inline-block w-2 h-2 bg-slate-400 rounded-full"></span>
                                          Industry Average: {transporter.industryAvgOnTime}%
                                        </p>
                                      </div>
                                      
                                      <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-orange-100 hover:shadow-xl transition-shadow">
                                        <div className="flex items-center justify-between mb-4">
                                          <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">Acceptance Rate</p>
                                          <div className="p-2.5 bg-orange-50 rounded-xl">
                                            <CheckCircle2 size={20} className="text-orange-600" />
                                          </div>
                                        </div>
                                        <div className="flex items-baseline gap-3 mb-3">
                                          <p className="font-black text-3xl text-slate-900">
                                            {Math.round((transporter.accepted / transporter.requested) * 100)}%
                                          </p>
                                          <p className="text-base font-semibold text-slate-500">
                                            {transporter.accepted}/{transporter.requested}
                                          </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <div className="progress-bar flex-1">
                                            <div 
                                              className="progress-fill bg-gradient-to-r from-orange-500 to-amber-600" 
                                              style={{ width: `${Math.round((transporter.accepted / transporter.requested) * 100)}%` }}
                                            ></div>
                                          </div>
                                          <span className="text-sm font-bold text-slate-600">
                                            {Math.round((transporter.accepted / transporter.requested) * 100)}%
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {showTransporterResults && filteredTransporterData.length === 0 && (
                  <div className="result-card text-center animate-scale-in">
                    <div className="p-6 bg-gradient-to-br from-slate-100 to-blue-100 rounded-2xl w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-lg">
                      <Search size={40} className="text-slate-600" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-3">No Data Available</h3>
                    <p className="text-lg text-slate-600 max-w-md mx-auto">
                      No transporter performance data found for the selected route and vehicle type combination.
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;