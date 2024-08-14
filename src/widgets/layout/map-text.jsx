import React, { useEffect, useRef, useState} from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import {Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import PropTypes from "prop-types";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MadagascarData } from '@/data/map-mg';
import NumberFormatter from './number-formatter';

const MapTextComponent = ({statisticData}) => {
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
              <h5>Donnée: ${stats.Data}</h5>
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
          fillColor: 'blue',
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
          {selectedFeature && (
            <div className="overflow-y-auto max-h-96">
              <table className="min-w-full bg-white">
                <thead className="sticky top-0 text-left bg-white border-y border-blue-gray-100">
                  <tr>
                    <th className="bg-blue-gray-50/50 p-4">District</th>
                    <th className="bg-blue-gray-50/50 p-4">Commune</th>
                    <th className="bg-blue-gray-50/50 p-4">Fokotany</th>
                    <th className="bg-blue-gray-50/50 p-4">Donnée</th>
                  </tr>
                </thead>
                <tbody>
                      {statisticData[selectedFeature.properties.name].District && statisticData[selectedFeature.properties.name].District.map((district) => (
                        <React.Fragment key={district.id}>
                          {district.Commune && district.Commune.map((commune) => (
                            <React.Fragment key={commune.id}>
                              {commune.Fokotany && commune.Fokotany.map((fokotany) => (
                                <tr key={fokotany.id}>
                                  <td>{district.nom}</td>
                                  <td>{commune.nom}</td>
                                  <td>{fokotany.nom}</td>
                                  <td className='text-right'><NumberFormatter number={fokotany.Data}/></td>
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
};

export default MapTextComponent;
