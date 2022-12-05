//@ts-ignore
import { IconLayer } from '@deck.gl/layers';
//@ts-ignore
import DeckGL from '@deck.gl/react';
import maplibregl from 'maplibre-gl';
import { useEffect } from 'react';
import { Map } from 'react-map-gl';
import imageData from './assets/metadata.json';
import { DRIVE_BASE_URL, DRIVE_THUMBNAIL_URL } from './constants';
import { Metadata } from './types';

const INITIAL_VIEW_STATE = {
  latitude: 40.132527,
  longitude: -4.114423,
  zoom: 5.5,
  pitch: 0,
  bearing: 0,
  dragRotate: false,
};

function App() {
  const layers = [
    new IconLayer({
      id: 'images-layer',
      data: imageData.map(({ location, ...others }: Metadata) => ({
        ...others,
        coordinates: location.split(',').map(Number),
      })),
      getIcon: (d: Metadata) => ({
        url: DRIVE_THUMBNAIL_URL + d.driveId,
        width: 128,
        height: 128,
        anchorY: 128,
        mask: true
      })
    }),
  ];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
      <Map
        reuseMaps
        mapStyle={
          'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
        }
        mapLib={maplibregl}
      />
    </DeckGL>
  );
}

export default App;
