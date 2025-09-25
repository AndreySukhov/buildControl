import React, { useEffect, useRef } from 'react';
import { Card, Typography } from 'antd';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Fill, Stroke } from 'ol/style';
import 'ol/ol.css';

const { Title } = Typography;

// GeoJSON типы
// type GeoJSONGeometry = {
//   type: 'Polygon' | 'MultiPolygon';
//   coordinates: number[][][] | number[][][][];
// };

interface ObjectMapProps {
  geometry?: any;
  center?: [number, number];
  zoom?: number;
}

export const ObjectMap: React.FC<ObjectMapProps> = ({ 
  geometry,
  center = [37.6173, 55.7558], // Москва по умолчанию
  zoom = 13 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Создаем источник для полигона
    const vectorSource = new VectorSource();

    if (geometry) {
      // Парсим GeoJSON в Feature
      const format = new GeoJSON({
        dataProjection: 'EPSG:4326', // долгота/широта
        featureProjection: 'EPSG:3857' // проекция карты
      });

      const feature = format.readFeature(geometry);

      // Стиль для полигона
            //@ts-ignore

      feature.setStyle(
        new Style({
          stroke: new Stroke({
            color: '#1890ff',
            width: 3
          }),
          fill: new Fill({
            color: 'rgba(24, 144, 255, 0.2)'
          })
        })
      );

      //@ts-ignore
      vectorSource.addFeature(feature);
    }

    // Создаем векторный слой
    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    // Создаем карту
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      view: new View({
        center: fromLonLat(center),
        zoom: zoom
      })
    });

    // Авто-фит на полигон
    if (geometry) {
      const extent = vectorSource.getExtent();
      if (extent) {
        map.getView().fit(extent, {
          padding: [50, 50, 50, 50],
          maxZoom: 16
        });
      }
    }

    mapInstanceRef.current = map;

    // Очистка при размонтировании
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
      }
    };
  }, [geometry, center, zoom]);

  return (
    <Card title="Карта объекта" style={{ marginBottom: '16px' }}>
      <div 
        ref={mapRef} 
        style={{ 
          height: '400px', 
          width: '100%',
          border: '1px solid #d9d9d9',
          borderRadius: '6px'
        }} 
      />
      
      {geometry && (
        <div style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
          <Title level={5} style={{ fontSize: '14px', marginBottom: '4px' }}>
            Территория объекта
          </Title>
        
        </div>
      )}
    </Card>
  );
};