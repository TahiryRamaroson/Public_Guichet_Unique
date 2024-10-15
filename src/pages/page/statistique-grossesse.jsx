import { api_url } from "@/configs/api-url";
import {
    CardHeader,
    Card,
    CardBody,
    Typography,
    Button,
    Tooltip,
    Input,
  } from "@material-tailwind/react";
  
  import Chart from "react-apexcharts";
  import { Square3Stack3DIcon, ArrowDownTrayIcon} from "@heroicons/react/24/solid";
  import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
  import ParticlesComponent from "@/widgets/layout/particle";
  import { NavbarPublic } from "@/widgets/layout";
  import { useState, useRef, useEffect } from 'react';

  export function StatistiqueGrossesse() {

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

    const [dataNombreParTrancheAge, setDataNombreParTrancheAge] = useState([]);
    const [formAnneeNombreParTrancheAge, setFormAnneeNombreParTrancheAge] = useState({
      annee: 0,
    });

    const handleAnneeNombreParTrancheAgeChange = (event) => {
      const { name, value } = event.target;
      setFormAnneeNombreParTrancheAge({
        ...formAnneeNombreParTrancheAge,
        [name]: value,
      });
      console.log(formAnneeNombreParTrancheAge);
    };

    const getNombreParTrancheAge = async (event) => {
      if (event) event.preventDefault();

      const apiFiltre = `${api_url}/api/Statistique/grossesse/nombreParTrancheAge`;
  
      try {
        const response = await fetch(apiFiltre , {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          },
          body: JSON.stringify(formAnneeNombreParTrancheAge),
        });
  
        if (!response.ok) {
          throw new Error('Erreur lors de la demande.');
        }
  
        const data = await response.json();
        console.log('Réponse de API Filtre :', data);
        setDataNombreParTrancheAge(data);
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire :', error.message);
      }
    };    

    useEffect(() => {
        getNombreParTrancheAge();
        getComplicationParTrancheAge();
    }, []);

      const chartConfig = {
        type: "pie",
        width: 500,
        height: 500,
        series: dataNombreParTrancheAge.series ? dataNombreParTrancheAge.series : [],
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
            enabled: true,
          },
          colors: dataNombreParTrancheAge.colors ? dataNombreParTrancheAge.colors : [],
          legend: {
            show: true,
            labels: {
                colors: 'gray'
              }
          },
          labels: dataNombreParTrancheAge.labels ? dataNombreParTrancheAge.labels : [],
        },
      };

      const [dataComplicationParTrancheAge, setDataComplicationParTrancheAge] = useState([]);
    const [formAnneeComplicationParTrancheAge, setFormAnneeComplicationParTrancheAge] = useState({
      annee: 0,
    });

    const handleAnneeComplicationParTrancheAgeChange = (event) => {
      const { name, value } = event.target;
      setFormAnneeComplicationParTrancheAge({
        ...formAnneeComplicationParTrancheAge,
        [name]: value,
      });
      console.log(formAnneeComplicationParTrancheAge);
    };

    const getComplicationParTrancheAge = async (event) => {
      if (event) event.preventDefault();

      const apiFiltre = `${api_url}/api/Statistique/grossesse/complicationParTrancheAge`;
  
      try {
        const response = await fetch(apiFiltre , {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          },
          body: JSON.stringify(formAnneeComplicationParTrancheAge),
        });
  
        if (!response.ok) {
          throw new Error('Erreur lors de la demande.');
        }
  
        const data = await response.json();
        console.log('Réponse de API Filtre :', data);
        setDataComplicationParTrancheAge(data);
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire :', error.message);
      }
    }; 
    
      const chartConfig2 = {
        type: "bar",
        width: 500,
        height: 500,
        series: [
          {
            name: "Taux",
            data: dataComplicationParTrancheAge.series ? dataComplicationParTrancheAge.series : [],
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
          colors: ["#58b15c"],
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
            categories: dataComplicationParTrancheAge.labels ? dataComplicationParTrancheAge.labels : [],
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

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 place-items-center">
        <ParticlesComponent />
        <div className="col-span-2 w-full mt-5">
            <NavbarPublic />
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-center z-10 mt-10">
            <Typography variant="h3" color="blue-gray">
                Statistique des grossesses
            </Typography>
        </div>
        <Card className="w-[80%] border-2 mt-10 mb-10">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            >
              <div className="w-max rounded-lg bg-[#58b15c] p-5 text-blue-gray">
                <Square3Stack3DIcon className="h-6 w-6" />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray">
                    Nombre de grossesses par tranche d&apos;âge
                </Typography>
                <form onSubmit={getNombreParTrancheAge} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <Input onChange={handleAnneeNombreParTrancheAgeChange} value={formAnneeNombreParTrancheAge.annee} name="annee" size="sm" label="Année" type="number" min={0} color="green"/>
                    </div>
                    <div className="flex flex-col">
                      <Button variant="text" color="green" type="submit" size="sm" className="w-[25%] text-center transform rotate-90">
                        <MagnifyingGlassIcon className="h-5 w-5" />
                      </Button>
                    </div>
                </form>
              </div>
              <div className="absolute right-0 top-0">
                <Tooltip content="Télécharger PDF">
                  <Button className="text-center" color="green" size="sm" onClick={handlePrintChart1} variant="text">
                    <ArrowDownTrayIcon className="h-5 w-5" />
                  </Button>
                </Tooltip>
              </div>
            </CardHeader>
            <CardBody className="mt-4 grid place-items-center px-2" ref={chartRef1}>
                <Chart {...chartConfig} />
            </CardBody>
        </Card>

        <Card className="w-[80%] border-2 mt-10 mb-10">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            >
              <div className="w-max rounded-lg bg-[#58b15c] p-5 text-blue-gray">
                <Square3Stack3DIcon className="h-6 w-6" />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray">
                    Taux de complications par tranche d&apos;âge
                </Typography>
                <form onSubmit={getComplicationParTrancheAge} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <Input onChange={handleAnneeComplicationParTrancheAgeChange} value={formAnneeComplicationParTrancheAge.annee} name="annee" size="sm" label="Année" type="number" min={0} color="green"/>
                    </div>
                    <div className="flex flex-col">
                      <Button variant="text" color="green" type="submit" size="sm" className="w-[25%] text-center transform rotate-90">
                        <MagnifyingGlassIcon className="h-5 w-5" />
                      </Button>
                    </div>
                </form>
              </div>
              <div className="absolute right-0 top-0">
                <Tooltip content="Télécharger PDF">
                  <Button className="text-center" color="green" size="sm" onClick={handlePrintChart2} variant="text">
                    <ArrowDownTrayIcon className="h-5 w-5" />
                  </Button>
                </Tooltip>
              </div>
            </CardHeader>
            <CardBody className="mt-4 grid place-items-center px-2" ref={chartRef2}>
                <Chart {...chartConfig2} />
            </CardBody>
        </Card>
        
      </div>
    );
  }
  
  export default StatistiqueGrossesse;
  