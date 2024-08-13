import {
    CardHeader,
    Card,
    CardBody,
    Typography,
    Button,
    Tooltip,
    Radio
  } from "@material-tailwind/react";
  
  import Chart from "react-apexcharts";
  import MapNumberComponent from "@/widgets/layout/map-number";
  import { StatisticNaisance, StatisticNaisanceFemme, StatisticNaisanceHomme } from "@/data/statistic-naissance";
  import { Square3Stack3DIcon, ArrowDownTrayIcon} from "@heroicons/react/24/solid";
  import ParticlesComponent from "@/widgets/layout/particle";


  import { useState, useRef } from 'react';
  import { useNavigate } from 'react-router-dom';
  
  
  const chartConfig = {
    type: "bar",
    height: 240,
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
        categories: ["January", "February", "March", "April", "May", "June", "Juy", "August", "September", "October", "November", "December"],
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

  export function StatistiqueNaissance() {

    const chartRef = useRef(null);
    const mapRef1 = useRef(null);
    const mapRef2 = useRef(null);

    const [selectedSex, setSelectedSex] = useState('Femme');
    const handleSexChange = (event) => {
      setSelectedSex(event.target.value);
      console.log(`---------------- ${event.target.value}`);
    };

    const getStatisticData = () => {
      return selectedSex === 'Homme' ? StatisticNaisanceHomme : StatisticNaisanceFemme;
    };

    const handlePrintChart = () => {
        const printContents = chartRef.current.innerHTML;
        const originalContents = document.body.innerHTML;                                            
    
        document.body.innerHTML = printContents;
        window.print();
    
        document.body.innerHTML = originalContents; 
        window.location.reload();
    
      };

    const handlePrintMap1 = () => {
      const printContents = mapRef1.current.innerHTML;
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
        <div className="col-span-1 md:col-span-2 flex justify-center z-10 mt-10">
            <Typography variant="h3" color="white">
                Statistique des naissances
            </Typography>
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-center mt-10 w-2/3">
            <Card className="w-full bg-transparent  border-2">
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
                      Nombre de naissance par période
                    </Typography>
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
                  Taux de naissances par région
                </Typography>
              </div>
              <div className="absolute right-0 top-0">
                <Tooltip content="Télécharger PDF">
                  <Button className="text-center" color="blue" size="sm" onClick={handlePrintMap1} variant="text">
                    <ArrowDownTrayIcon className="h-5 w-5" />
                  </Button>
                </Tooltip>
              </div>
            </CardHeader>
            <CardBody className="px-2 pb-0" ref={mapRef1}>
              <MapNumberComponent statisticData={StatisticNaisance} />
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
                  Répartition des sexes par région
                </Typography>
                <div className="flex gap-10">
                  <Radio name="sexe" value="Homme" label="Homme" color="blue" ripple={true} checked={selectedSex === 'Homme'} onChange={handleSexChange} />
                  <Radio name="sexe" value="Femme" label="Femme" color="blue" ripple={true} checked={selectedSex === 'Femme'} onChange={handleSexChange} />
                </div>
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
              <MapNumberComponent statisticData={getStatisticData()} />
            </CardBody>
        </Card>
        
      </div>
    );
  }
  
  export default StatistiqueNaissance;
  