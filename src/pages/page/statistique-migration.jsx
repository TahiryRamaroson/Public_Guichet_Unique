import { api_url } from "@/configs/api-url";
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
  import { useState, useRef, useEffect } from 'react';
  

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

      const [dataFluxParMois, setDataFluxParMois] = useState([]);
    const [formAnneeFluxParMois, setFormAnneeFluxParMois] = useState({
      annee: 0,
    });

    const handleAnneeFluxParMoisChange = (event) => {
      const { name, value } = event.target;
      setFormAnneeFluxParMois({
        ...formAnneeFluxParMois,
        [name]: value,
      });
      console.log(formAnneeFluxParMois);
    };

    const getFluxParMois = async (event) => {
      if (event) event.preventDefault();

      const apiFiltre = `${api_url}/api/Statistique/migration/fluxParMois`;
  
      try {
        const response = await fetch(apiFiltre , {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          },
          body: JSON.stringify(formAnneeFluxParMois),
        });
  
        if (!response.ok) {
          throw new Error('Erreur lors de la demande.');
        }
  
        const data = await response.json();
        console.log('Réponse de API Filtre :', data);
        setDataFluxParMois(data);
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire :', error.message);
      }
    }; 

    useEffect(() => {
      getFluxParMois();
      getMotifPlusFrequent();
    }, []);

      const chartConfig = {
        type: "line",
        height: 360,
        series: [
            {
              name: "Entrante",
              data: dataFluxParMois.entrantes ? dataFluxParMois.entrantes : [],
            },
            {
              name: "Sortante",
              data: dataFluxParMois.sortantes ? dataFluxParMois.sortantes : [],
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
            categories: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
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

    const [dataMotifPlusFrequent, setDataMotifPlusFrequent] = useState([]);
    const [formAnneeMotifPlusFrequent, setFormAnneeMotifPlusFrequent] = useState({
      annee: 0,
    });

    const handleAnneeMotifPlusFrequentChange = (event) => {
      const { name, value } = event.target;
      setFormAnneeMotifPlusFrequent({
        ...formAnneeMotifPlusFrequent,
        [name]: value,
      });
      console.log(formAnneeMotifPlusFrequent);
    };

    const getMotifPlusFrequent = async (event) => {
      if (event) event.preventDefault();

      const apiFiltre = `${api_url}/api/Statistique/migration/motifPlusFrequent`;
  
      try {
        const response = await fetch(apiFiltre , {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          },
          body: JSON.stringify(formAnneeMotifPlusFrequent),
        });
  
        if (!response.ok) {
          throw new Error('Erreur lors de la demande.');
        }
  
        const data = await response.json();
        console.log('Réponse de API Filtre :', data);
        setDataMotifPlusFrequent(data);
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
                <form onSubmit={getFluxParMois} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <Input onChange={handleAnneeFluxParMoisChange} value={formAnneeFluxParMois.annee} name="annee" size="sm" label="Année" type="number" min={0} color="blue"/>
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
                <form onSubmit={getMotifPlusFrequent} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <Input onChange={handleAnneeMotifPlusFrequentChange} value={formAnneeMotifPlusFrequent.annee} name="annee" size="sm" label="Année" type="number" min={0} color="blue"/>
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
                {dataMotifPlusFrequent && dataMotifPlusFrequent.length > 0 ? (
                      dataMotifPlusFrequent.map((item, index) => (
                        <TimelineItem key={item.id} className="h-28">
                          <TimelineConnector className="!w-[78px]" />
                          <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                            <TimelineIcon className="p-3" variant="ghost" color="blue">
                              n°{index + 1}
                            </TimelineIcon>
                            <div className="flex flex-col gap-1">
                              <Typography variant="h6" color="blue-gray">
                                {item.nom ? item.nom : ''}
                              </Typography>
                            </div>
                          </TimelineHeader>
                        </TimelineItem>
                      ))
                    ) : (
                      <Timeline>
                      <TimelineItem className="h-28">
                        <TimelineConnector className="!w-[78px]" />
                        <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                          <TimelineIcon className="p-3" variant="ghost" color="blue">
                            n°1
                          </TimelineIcon>
                          <div className="flex flex-col gap-1">
                            <Typography variant="h6" color="blue-gray">
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
                            </Typography>
                          </div>
                        </TimelineHeader>
                      </TimelineItem>
                      <TimelineItem className="h-28">
                        <TimelineConnector className="!w-[78px]" />
                        <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                          <TimelineIcon className="p-3" variant="ghost" color="blue">
                            n°3
                          </TimelineIcon>
                          <div className="flex flex-col gap-1">
                            <Typography variant="h6" color="blue-gray">
                            </Typography>
                          </div>
                        </TimelineHeader>
                      </TimelineItem>
                      </Timeline>
                    )}
                </Timeline>
            </div>
            </CardBody>
        </Card>
        
      </div>
    );
  }
  
  export default StatistiqueMigration;
  