import React, { useState} from 'react';
import { api_url } from '@/configs/api-url';
import { MapContainer, TileLayer, GeoJSON} from 'react-leaflet';
import {Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input } from '@material-tailwind/react';
import PropTypes from "prop-types";
import 'leaflet/dist/leaflet.css';
import { MadagascarData } from '@/data/map-mg';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const MapTextComponent = ({statisticData, annee, apiDetails}) => {
  const geojsonData = MadagascarData;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.name && statisticData) {
        const stats = statisticData[feature.properties.name];
        if (stats) {
          const tooltipContent = `
            <div>
              <h1>${feature.properties.name}</h1>
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
          color: 'black',
          fillColor: '#21d148',
          fillOpacity: 0.5,
        });
      },
      mouseout: (e) => {
        e.target.setStyle({
          color: 'black',
          fillColor: 'black',
          fillOpacity: 0.2,
        });
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

  const geoJsonStyle = {
    color: 'black',
    fillColor: 'black',
    fillOpacity: 0.2,
  };

  const [dataDetails, setDataDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getDetails= async (nomRegion) => {

    let apiFiltre = `${api_url}/api/Statistique/${apiDetails}/${annee}/${nomRegion}`;

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
      <GeoJSON data={geojsonData} onEachFeature={onEachFeature} style={geoJsonStyle}/>
      <Dialog open={dialogOpen} handler={closeDialog}>
        <DialogHeader>Détails région {selectedFeature ? selectedFeature.properties.name : ''}</DialogHeader>
        <DialogBody>
          <div className="flex justify-between items-center mb-4 gap-4">
            <Input type="text" label="Rechercher" color='green' value={searchTerm} onChange={handleSearchChange} />
            <Button color="green" size="regular" ripple="light">
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
                                <td className='text-left'>{fokontany.data}</td>
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

MapTextComponent.propTypes = {
    statisticData: PropTypes.object,
    annee: PropTypes.number,
    apiDetails: PropTypes.string,
};

export default MapTextComponent;
