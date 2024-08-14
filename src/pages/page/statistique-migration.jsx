import {
    CardHeader,
    Card,
    CardBody,
    Typography,
    Button,
    Tooltip,
    Input,
    Timeline,
    TimelineItem,
    TimelineHeader,
    TimelineConnector,
    TimelineIcon
  } from "@material-tailwind/react";
  
  import Chart from "react-apexcharts";
  import { Square3Stack3DIcon, ArrowDownTrayIcon} from "@heroicons/react/24/solid";
  import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
  import ParticlesComponent from "@/widgets/layout/particle";
  import { NavbarPublic } from "@/widgets/layout";


  import { useState, useRef } from 'react';
  import { useNavigate } from 'react-router-dom';
  
  
  const chartConfig = {
    type: "line",
    height: 360,
    series: [
        {
          name: "Entrante",
          data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
        },
        {
          name: "Sortante", // ou un autre nom pour la deuxième ligne
          data: [30, 25, 200, 220, 400, 300, 150, 180, 400], // données pour la deuxième ligne
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
      colors: ["#28da40", "#3599ee"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
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
        categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
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
        opacity: 0.8,
      },
      tooltip: {
        theme: "light",
      },
      legend: {
        show: true,
        labels: {
            colors: 'white'
          }
      },
    },
  };

  export function StatistiqueMigration() {

    const chartRef1 = useRef(null);
    const chartRef2 = useRef(null);

    const handlePrintChart1 = () => {
        const printContents = chartRef1.current.innerHTML;
        const originalContents = document.body.innerHTML;                                            
    
        document.body.innerHTML = printContents;
        window.print();
    
        document.body.innerHTML = originalContents; 
        window.location.reload();
    
      };

      const handlePrintChart2 = () => {
        const printContents = chartRef2.current.innerHTML;
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
                Statistique des migrations
            </Typography>
        </div>
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
                    Flux de migration entrante et sortante
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
                  <Button className="text-center" color="blue" size="sm" onClick={handlePrintChart1} variant="text">
                    <ArrowDownTrayIcon className="h-5 w-5" />
                  </Button>
                </Tooltip>
              </div>
            </CardHeader>
            <CardBody className="px-2 pb-0" ref={chartRef1}>
                <Chart {...chartConfig} />
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
                    Motif de migration les plus fréquents
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
                  <Button className="text-center" color="blue" size="sm" onClick={handlePrintChart2} variant="text">
                    <ArrowDownTrayIcon className="h-5 w-5" />
                  </Button>
                </Tooltip>
              </div>
            </CardHeader>
            <CardBody className="mt-4 grid place-items-center px-2" ref={chartRef2}>
            <div className="w-[25rem]">
                <Timeline>
                  <TimelineItem className="h-28">
                    <TimelineConnector className="!w-[78px]" />
                    <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                      <TimelineIcon className="p-3" variant="ghost" color="blue">
                        n°1
                      </TimelineIcon>
                      <div className="flex flex-col gap-1">
                        <Typography variant="h6" color="blue-gray">
                          Fondation d&apos;un nouveau ménage
                        </Typography>
                      </div>
                    </TimelineHeader>
                  </TimelineItem>
                  <TimelineItem className="h-28">
                    <TimelineConnector className="!w-[78px]" />
                    <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                      <TimelineIcon className="p-3" variant="ghost" color="blue">
                        n°2
                      </TimelineIcon>
                      <div className="flex flex-col gap-1">
                        <Typography variant="h6" color="blue-gray">
                          Poursuite des études
                        </Typography>
                      </div>
                    </TimelineHeader>
                  </TimelineItem>
                  <TimelineItem className="h-28">
                    <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                      <TimelineIcon className="p-3" variant="ghost" color="blue">
                        n°3
                      </TimelineIcon>
                      <div className="flex flex-col gap-1">
                        <Typography variant="h6" color="blue-gray">
                          Raison médical
                        </Typography>
                      </div>
                    </TimelineHeader>
                  </TimelineItem>
                </Timeline>
            </div>
            </CardBody>
        </Card>
        
      </div>
    );
  }
  
  export default StatistiqueMigration;
  