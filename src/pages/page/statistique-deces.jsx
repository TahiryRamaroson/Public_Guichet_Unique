import { api_url } from "@/configs/api-url";
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


  import { useState, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
  

  export function StatistiqueDeces() {

    const chartRef1 = useRef(null);
    const chartRef2 = useRef(null);
    const mapRef1 = useRef(null);
    const mapRef2 = useRef(null);

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

    const [dataMortaliteParTrancheAge, setDataMortaliteParTrancheAge] = useState([]);
    const [formAnneeMortaliteParTrancheAge, setFormAnneeMortaliteParTrancheAge] = useState({
      annee: 0,
    });

    const handleAnneeMortaliteParTrancheAgeChange = (event) => {
      const { name, value } = event.target;
      setFormAnneeMortaliteParTrancheAge({
        ...formAnneeMortaliteParTrancheAge,
        [name]: value,
      });
      console.log(formAnneeMortaliteParTrancheAge);
    };

    const getMortaliteParTrancheAge = async (event) => {
      if (event) event.preventDefault();

      const apiFiltre = `${api_url}/api/Statistique/deces/mortaliteParTrancheAge`;
  
      try {
        const response = await fetch(apiFiltre , {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          },
          body: JSON.stringify(formAnneeMortaliteParTrancheAge),
        });
  
        if (!response.ok) {
          throw new Error('Erreur lors de la demande.');
        }
  
        const data = await response.json();
        console.log('Réponse de API Filtre :', data);
        setDataMortaliteParTrancheAge(data);
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire :', error.message);
      }
    }; 

    useEffect(() => {
      getMortaliteParTrancheAge();
      getCauseParTrancheAge();
  }, []);

    const chartConfig2 = {
      type: "bar",
      width: 500,
      height: 500,
      series: [
        {
          name: "Taux",
          data: dataMortaliteParTrancheAge.series ? dataMortaliteParTrancheAge.series : [],
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
            columnWidth: "20%",
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
          categories: dataMortaliteParTrancheAge.labels ? dataMortaliteParTrancheAge.labels : [],
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

    const [dataCauseParTrancheAge, setDataCauseParTrancheAge] = useState([]);
    const [formAnneeCauseParTrancheAge, setFormAnneeCauseParTrancheAge] = useState({
      annee: 0,
    });

    const handleAnneeCauseParTrancheAgeChange = (event) => {
      const { name, value } = event.target;
      setFormAnneeCauseParTrancheAge({
        ...formAnneeCauseParTrancheAge,
        [name]: value,
      });
      console.log(formAnneeCauseParTrancheAge);
    };

    const getCauseParTrancheAge = async (event) => {
      if (event) event.preventDefault();

      const apiFiltre = `${api_url}/api/Statistique/deces/causeParTrancheAge`;
  
      try {
        const response = await fetch(apiFiltre , {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          },
          body: JSON.stringify(formAnneeCauseParTrancheAge),
        });
  
        if (!response.ok) {
          throw new Error('Erreur lors de la demande.');
        }
  
        const data = await response.json();
        console.log('Réponse de API Filtre :', data);
        setDataCauseParTrancheAge(data);
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire :', error.message);
      }
    }; 

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 place-items-center">
        <ParticlesComponent />
        <div className="col-span-2 w-full mt-5">
            <NavbarPublic />
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-center z-10 mt-10">
            <Typography variant="h3" color="white">
                Statistique des décès
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
                Taux de mortalité par tranche d&apos;âge
                </Typography>
                <form onSubmit={getMortaliteParTrancheAge} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <Input onChange={handleAnneeMortaliteParTrancheAgeChange} value={formAnneeMortaliteParTrancheAge.annee} name="annee" size="sm" label="Année" type="number" min={0} color="blue"/>
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
            <CardBody className="mt-4 grid place-items-center px-2" ref={chartRef1}>
              <Chart {...chartConfig2}/>
            </CardBody>
        </Card>

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
                    Causes principales de décès par tranche d&apos;âge
                </Typography>
                <form onSubmit={getCauseParTrancheAge} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <Input onChange={handleAnneeCauseParTrancheAgeChange} value={formAnneeCauseParTrancheAge} name="annee" size="sm" label="Année" type="number" min={0} color="blue"/>
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
            <Card className="h-full w-full bg-transparent">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                      <th className="border-b border-white-100 p-4">
                        <Typography
                          variant="h6"
                          color="white"
                          className="font-normal leading-none"
                        >
                          Tranche d&apos;âge
                        </Typography>
                      </th>
                      <th className="border-b border-white-100 p-4">
                        <Typography
                          variant="h6"
                          color="white"
                          className="font-normal leading-none"
                        >
                          Cause
                        </Typography>
                      </th>
                  </tr>
                </thead>
                <tbody>
                  {dataCauseParTrancheAge && dataCauseParTrancheAge.map((item) => (
                    <tr key={item.trancheAge} className="even:bg-white-50/50">
                      <td className="p-4">
                        <Typography variant="small" color="white" className="font-normal">
                          {item.trancheAge}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography variant="small" color="white" className="font-normal">
                          {item.causeDeces ? item.causeDeces : 'Non défini'}
                        </Typography>
                      </td>
                    </tr>
                    ))};
                </tbody>
              </table>
            </Card>
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
                  Taux de mortalité par région
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
                    Causes principales de décès par région
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
  
  export default StatistiqueDeces;
  