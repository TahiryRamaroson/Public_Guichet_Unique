import {
    CardHeader,
    Card,
    CardBody,
    Typography,
    Button,
    Tooltip,
    Input
  } from "@material-tailwind/react";
  
  import Chart from "react-apexcharts";
  import MapNumberComponent from "@/widgets/layout/map-number";
  import MapTextComponent from "@/widgets/layout/map-text";
  import { StatisticNaisance} from "@/data/statistic-naissance";
  import { StatisticDeces } from "@/data/statistic-deces";
  import { Square3Stack3DIcon, ArrowDownTrayIcon} from "@heroicons/react/24/solid";
  import ParticlesComponent from "@/widgets/layout/particle";
  import { NavbarPublic } from "@/widgets/layout";


  import { useState, useRef } from 'react';
  import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
  
  
const chartConfig = {
    type: "bar",
    height: 500,
    series: [
      {
        name: "Sales",
        data: [141, 28, 275, 50, 40, 300, 320, 500, 350, 200, 230, 500],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: true,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#3599ee"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
          horizontal: true,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#979899",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: ["Plainte 1", "Plainte 2", "Plainte 3", "Plainte 4", "Plainte 5", "Plainte 6", "Plainte 7", "Plainte 8", "Plainte 9", "Plainte 10", "Plainte 11", "Plainte 12"],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#979899",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        theme: "light",
      },
    },
  };

  export function StatistiquePlainte() {

    const chartRef = useRef(null);
    const mapRef2 = useRef(null);

    const handlePrintChart = () => {
        const printContents = chartRef.current.innerHTML;
        const originalContents = document.body.innerHTML;                                            
    
        document.body.innerHTML = printContents;
        window.print();
    
        document.body.innerHTML = originalContents; 
        window.location.reload();
    
      };

    const handlePrintMap2 = () => {
      const printContents = mapRef2.current.innerHTML;
      const originalContents = document.body.innerHTML;                                            
  
      document.body.innerHTML = printContents;
      window.print();
  
      document.body.innerHTML = originalContents; 
      window.location.reload();
  
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 place-items-center">
        <ParticlesComponent />
        <div className="col-span-2 w-full mt-5">
            <NavbarPublic />
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-center z-10 mt-10">
            <Typography variant="h3" color="white">
                Statistique des plaintes
            </Typography>
        </div>
        <Card className="w-[80%] bg-transparent  border-2 mt-10">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            >
              <div className="w-max rounded-lg bg-[#3599ee] p-5 text-white">
                <Square3Stack3DIcon className="h-6 w-6" />
              </div>
              <div>
                <Typography variant="h6" color="white">
                    Nombre de plaintes par catégorie
                </Typography>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <Input size="sm" label="Année" type="number" min={2000} color="blue"/>
                    </div>
                    <div className="flex flex-col">
                      <Button variant="text" color="blue" type="submit" size="sm" className="w-[25%] text-center transform rotate-90">
                        <MagnifyingGlassIcon className="h-5 w-5" />
                      </Button>
                    </div>
                </form>
              </div>
              <div className="absolute right-0 top-0">
                <Tooltip content="Télécharger PDF">
                  <Button className="text-center" color="blue" size="sm" onClick={handlePrintChart} variant="text">
                    <ArrowDownTrayIcon className="h-5 w-5" />
                  </Button>
                </Tooltip>
              </div>
            </CardHeader>
            <CardBody className="px-2 pb-0" ref={chartRef}>
              <Chart {...chartConfig}/>
            </CardBody>
        </Card>

        <Card className="w-[80%] bg-transparent border-2 mt-10 mb-10">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            >
              <div className="w-max rounded-lg bg-[#3599ee] p-5 text-white">
                <Square3Stack3DIcon className="h-6 w-6" />
              </div>
              <div>
                <Typography variant="h6" color="white">
                    Plaintes les plus fréquents par région
                </Typography>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <Input size="sm" label="Année" type="number" min={2000} color="blue"/>
                    </div>
                    <div className="flex flex-col">
                      <Button variant="text" color="blue" type="submit" size="sm" className="w-[25%] text-center transform rotate-90">
                        <MagnifyingGlassIcon className="h-5 w-5" />
                      </Button>
                    </div>
                </form>
              </div>
              <div className="absolute right-0 top-0">
                <Tooltip content="Télécharger PDF">
                  <Button className="text-center" color="blue" size="sm" onClick={handlePrintMap2} variant="text">
                    <ArrowDownTrayIcon className="h-5 w-5" />
                  </Button>
                </Tooltip>
              </div>
            </CardHeader>
            <CardBody className="px-2 pb-0" ref={mapRef2}>
              <MapTextComponent statisticData={StatisticDeces} />
            </CardBody>
        </Card>
        
      </div>
    );
  }
  
  export default StatistiquePlainte;
  