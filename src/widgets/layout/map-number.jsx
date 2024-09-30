import React, { useEffect, useRef, useState} from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import {Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input } from '@material-tailwind/react';
import PropTypes from "prop-types";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MadagascarData } from '@/data/map-mg';
import NumberFormatter from './number-formatter';
import { api_url } from '@/configs/api-url';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const MapNumberComponent = ({statisticData, annee, apiDetails, isSexe, sexe}) => {
  const geojsonData = MadagascarData;
  const geoJsonRef = useRef();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const getColor = (d) => {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
  };

  const style = (feature) => {
    const stats = statisticData[feature.properties.name];
    return {
      fillColor: stats ? getColor(stats.data) : '#FFEDA0',
      weight: 2,
      opacity: 1,
      color: 'black',
      dashArray: '3',
      fillOpacity: 0.7
    };
  };

  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.name && statisticData) {
      const stats = statisticData[feature.properties.name];
      console.log("Feature processed:", feature.properties.name);
      console.log("Available keys in statisticData:", Object.keys(statisticData));
      if (stats) {
        const tooltipContent = `
          <div>
            <h3>${feature.properties.name}</h3>
            <h5>Donnée: ${stats.data}</h5>
          </div>
        `;
        layer.bindTooltip(tooltipContent, {
          permanent: false,
          direction: 'top',
          opacity: 0.9,
        });
      }
    }

    layer.on({
      mouseover: (e) => {
        e.target.setStyle({
          weight: 5,
          color: 'black',
          dashArray: '',
          fillOpacity: 0.7
        });
      },
      mouseout: (e) => {
        geoJsonRef.current.resetStyle(e.target);
      },
      click: (e) => {
        setSelectedFeature(feature);
        getDetails(feature.properties.name);
        setDialogOpen(true);
      }
    });
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedFeature(null);
  };

  const Legend = () => {
    const map = useMap();

    useEffect(() => {
      const legend = L.control({ position: 'bottomright' });

      legend.onAdd = () => {
        const div = L.DomUtil.create('div', 'info legend');
        const grades = [0, 10, 20, 50, 100, 200, 500, 1000];

        for (let i = 0; i < grades.length; i++) {
          div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '">___</i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        div.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        div.style.color = 'black';
        div.style.padding = '10px';
        div.style.borderRadius = '5px';

        return div;
      };

      legend.addTo(map);

      return () => {
        legend.remove();
      };
    }, [map]);

    return null;
  };

  const [dataDetails, setDataDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getDetails= async (nomRegion) => {

    let apiFiltre = '';
    if (isSexe) apiFiltre = `${api_url}/api/Statistique/${apiDetails}/${annee}/${nomRegion}/${sexe}`;
    else apiFiltre = `${api_url}/api/Statistique/${apiDetails}/${annee}/${nomRegion}`;

    try {
      const response = await fetch(apiFiltre , {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la demande.');
      }

      const data = await response.json();
      console.log('Réponse de API Filtre :', data);
      setDataDetails(data.districts);
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire :', error.message);
    }
  };

  return (
    <MapContainer center={[-18.8792, 47.5079]} zoom={6} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=7mQ6YCT1PO0Afnn1L5LP"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      <GeoJSON data={geojsonData} onEachFeature={onEachFeature} style={style} ref={geoJsonRef}/>
      <Legend />

      <Dialog open={dialogOpen} handler={closeDialog}>
        <DialogHeader>Détails région {selectedFeature ? selectedFeature.properties.name : ''}</DialogHeader>
        <DialogBody>
          <div className="flex justify-between items-center mb-4 gap-4">
            <Input type="text" label="Rechercher" color='blue' value={searchTerm} onChange={handleSearchChange} />
            <Button color="blue" size="regular" ripple="light">
              <MagnifyingGlassIcon className="h-4 w-4 transform rotate-90" />
            </Button>
          </div>
          {selectedFeature && (
            <div className="overflow-y-auto max-h-96">
              <table className="min-w-full bg-white">
                <thead className="sticky top-0 text-left bg-white border-y border-blue-gray-100">
                  <tr>
                    <th className="bg-blue-gray-50/50 p-4">District</th>
                    <th className="bg-blue-gray-50/50 p-4">Commune</th>
                    <th className="bg-blue-gray-50/50 p-4">Fokontany</th>
                    <th className="bg-blue-gray-50/50 p-4">Donnée</th>
                  </tr>
                </thead>
                <tbody>
                  {dataDetails && dataDetails
                    .filter(district => 
                      district.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      district.communes.some(commune => 
                        commune.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        commune.fokontanies.some(fokontany => 
                          fokontany.nom.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                      )
                    )
                    .map((district) => (
                      <React.Fragment key={district.id}>
                        {district.communes && district.communes.map((commune) => (
                          <React.Fragment key={commune.id}>
                            {commune.fokontanies && commune.fokontanies.map((fokontany) => (
                              <tr key={fokontany.id}>
                                <td>{district.nom}</td>
                                <td>{commune.nom}</td>
                                <td>{fokontany.nom}</td>
                                <td className='text-right'><NumberFormatter number={fokontany.data}/></td>
                              </tr>
                            ))}
                          </React.Fragment>
                        ))}
                      </React.Fragment>
                    ))}
                </tbody>
              </table>
            </div>
          )}

        </DialogBody>
        <DialogFooter>
          <Button color="red" onClick={closeDialog}>
            Fermer
          </Button>
        </DialogFooter>
      </Dialog>

    </MapContainer>
  );
};

MapNumberComponent.propTypes = {
    statisticData: PropTypes.object,
    annee: PropTypes.number,
    apiDetails: PropTypes.string,
    isSexe: PropTypes.bool,
    sexe: PropTypes.number
};

export default MapNumberComponent;
