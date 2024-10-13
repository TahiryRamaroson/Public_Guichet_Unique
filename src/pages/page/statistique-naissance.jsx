import { api_url } from "@/configs/api-url";
import {
    CardHeader,
    Card,
    CardBody,
    Typography,
    Button,
    Tooltip,
    Radio,
    Input
  } from "@material-tailwind/react";
  
  import Chart from "react-apexcharts";
  import MapNumberComponent from "@/widgets/layout/map-number";
  import { Square3Stack3DIcon, ArrowDownTrayIcon} from "@heroicons/react/24/solid";
  import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
  import ParticlesComponent from "@/widgets/layout/particle";
  import { NavbarPublic } from "@/widgets/layout";
  import { useState, useRef, useEffect } from 'react';
  

  export function StatistiqueNaissance() {

    const chartRef = useRef(null);
    const mapRef1 = useRef(null);
    const mapRef2 = useRef(null);

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

    const [dataNombreParMois, setDataNombreParMois] = useState([]);
    const [formAnneeNombreParMois, setFormAnneeNombreParMois] = useState({
      annee: 0,
    });

    const handleAnneeNombreParMoisChange = (event) => {
      const { name, value } = event.target;
      setFormAnneeNombreParMois({
        ...formAnneeNombreParMois,
        [name]: value,
      });
      console.log(formAnneeNombreParMois);
    };

    const getNombreParMois = async (event) => {
      if (event) event.preventDefault();

      const apiFiltre = `${api_url}/api/Statistique/naissance/nombreParMois`;
  
      try {
        const response = await fetch(apiFiltre , {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          },
          body: JSON.stringify(formAnneeNombreParMois),
        });
  
        if (!response.ok) {
          throw new Error('Erreur lors de la demande.');
        }
  
        const data = await response.json();
        console.log('Réponse de API Filtre :', data);
        setDataNombreParMois(data);
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire :', error.message);
      }
    };    

    useEffect(() => {
        getNombreParMois();
        getNombreParRegion();
        getRepartitionSexeParRegion();
    }, []);

    const chartConfig = {
      type: "bar",
      height: 240,
      series: [
        {
          name: "Nombre de naissances",
          data: dataNombreParMois ? dataNombreParMois : [],
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
        colors: ["#21d148"],
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

    const [dataNombreParRegion, setDataNombreParRegion] = useState({});
    const [formAnneeNombreParRegion, setFormAnneeNombreParRegion] = useState({
      annee: 0,
    });

    const handleAnneeNombreParRegionChange = (event) => {
      const { name, value } = event.target;
      setFormAnneeNombreParRegion({
        ...formAnneeNombreParRegion,
        [name]: value,
      });
      console.log(formAnneeNombreParRegion);
    };

    const [loading, setLoading] = useState(true);

    const getNombreParRegion = async (event) => {
      if (event) event.preventDefault();

      const apiFiltre = `${api_url}/api/Statistique/naissance/nombreParRegion`;
  
      try {
        setLoading(true);
        const response = await fetch(apiFiltre , {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          },
          body: JSON.stringify(formAnneeNombreParRegion),
        });
  
        if (!response.ok) {
          throw new Error('Erreur lors de la demande.');
        }
  
        const data = await response.json();
        console.log('Réponse de API Filtre :', data);
        setDataNombreParRegion(data);
        console.log(dataNombreParRegion);
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire :', error.message);
      } finally {  
        setLoading(false);
      }
    };

    const [dataRepartitionSexeParRegion, setDataRepartitionSexeParRegion] = useState({});
    const [formAnneeRepartitionSexeParRegion, setFormAnneeRepartitionSexeParRegion] = useState({
      annee: 0,
      sexe: 1,
    });

    const handleAnneeRepartitionSexeParRegionChange = (event) => {
      const { name, value } = event.target;
      setFormAnneeRepartitionSexeParRegion({
        ...formAnneeRepartitionSexeParRegion,
        [name]: value,
      });
      console.log(formAnneeRepartitionSexeParRegion);
    };

    const [loadingSexe, setLoadingSexe] = useState(true);

    const getRepartitionSexeParRegion = async (event) => {
      if (event) event.preventDefault();

      const apiFiltre = `${api_url}/api/Statistique/naissance/repartitionSexeParRegion`;
  
      try {
        setLoadingSexe(true);
        const response = await fetch(apiFiltre , {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          },
          body: JSON.stringify(formAnneeRepartitionSexeParRegion),
        });
  
        if (!response.ok) {
          throw new Error('Erreur lors de la demande.');
        }
  
        const data = await response.json();
        console.log('Réponse de API Filtre :', data);
        setDataRepartitionSexeParRegion(data);
        console.log(dataRepartitionSexeParRegion);
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire :', error.message);
      } finally {  
        setLoadingSexe(false);
      }
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 place-items-center">
        <ParticlesComponent />
        <div className="col-span-2 w-full mt-5">
            <NavbarPublic />
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-center z-10 mt-10">
            <Typography variant="h3" color="blue-gray">
                Statistique des naissances
            </Typography>
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-center mt-10 w-2/3">
            <Card className="w-full  border-2">
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                >
                  <div className="w-max rounded-lg bg-[#21d148] p-5 text-blue-gray">
                    <Square3Stack3DIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      Nombre de naissance par période
                    </Typography>
                    <form onSubmit={getNombreParMois} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <Input onChange={handleAnneeNombreParMoisChange} value={formAnneeNombreParMois.annee} name="annee" size="sm" label="Année" type="number" min={0} color="green"/>
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
                      <Button className="text-center" color="green" size="sm" onClick={handlePrintChart} variant="text">
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
        <Card className="w-[80%] border-2 mt-10 mb-10">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            >
              <div className="w-max rounded-lg bg-[#21d148] p-5 text-blue-gray">
                <Square3Stack3DIcon className="h-6 w-6" />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray">
                  Nombre de naissances par région
                </Typography>
                <form onSubmit={getNombreParRegion} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex flex-col">
                    <Input onChange={handleAnneeNombreParRegionChange} value={formAnneeNombreParRegion.annee} name="annee" size="sm" label="Année" type="number" min={0} color="green"/>
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
                  <Button className="text-center" color="green" size="sm" onClick={handlePrintMap1} variant="text">
                    <ArrowDownTrayIcon className="h-5 w-5" />
                  </Button>
                </Tooltip>
              </div>
            </CardHeader>
            <CardBody className="px-2 pb-0" ref={mapRef1}>
            {loading ? (
              <p className="animate-pulse">Chargement des données...</p>
            ) : (
              <MapNumberComponent statisticData={dataNombreParRegion} annee={formAnneeNombreParRegion.annee} isSexe={false} apiDetails="naissance/detailsNombreParRegion" />
            )}
            </CardBody>
        </Card>

        <Card className="w-[80%] border-2 mt-10 mb-10">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            >
              <div className="w-max rounded-lg bg-[#21d148] p-5 text-blue-gray">
                <Square3Stack3DIcon className="h-6 w-6" />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray">
                  Répartition des sexes par région
                </Typography>
                <form onSubmit={getRepartitionSexeParRegion} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex flex-col">
                    <Input onChange={handleAnneeRepartitionSexeParRegionChange} value={formAnneeRepartitionSexeParRegion.annee} name="annee" size="sm" label="Année" type="number" min={0} color="green"/>
                  </div>
                  <div className="flex flex-col">
                    <Button variant="text" color="green" type="submit" size="sm" className="w-[25%] text-center transform rotate-90">
                      <MagnifyingGlassIcon className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex gap-10">
                  <Radio name="sexe" value={1} label="Homme" color="green" ripple={true} checked={formAnneeRepartitionSexeParRegion.sexe == 1} onChange={handleAnneeRepartitionSexeParRegionChange} />
                  <Radio name="sexe" value={0} label="Femme" color="green" ripple={true} checked={formAnneeRepartitionSexeParRegion.sexe == 0} onChange={handleAnneeRepartitionSexeParRegionChange} />
                </div>
                </form>
              </div>
              <div className="absolute right-0 top-0">
                <Tooltip content="Télécharger PDF">
                  <Button className="text-center" color="green" size="sm" onClick={handlePrintMap2} variant="text">
                    <ArrowDownTrayIcon className="h-5 w-5" />
                  </Button>
                </Tooltip>
              </div>
            </CardHeader>
            <CardBody className="px-2 pb-0" ref={mapRef2}>
            {loadingSexe ? (
              <p className="animate-pulse">Chargement des données...</p>
            ) : (
              <MapNumberComponent statisticData={dataRepartitionSexeParRegion} annee={formAnneeRepartitionSexeParRegion.annee} sexe={formAnneeRepartitionSexeParRegion.sexe} isSexe={true} apiDetails="naissance/detailsRepartitionSexeParRegion" />
            )}
            </CardBody>
        </Card>
        
      </div>
    );
  }
  
  export default StatistiqueNaissance;
  