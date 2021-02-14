import React, {
  useEffect, useRef, useState, useCallback,
} from 'react';
import { Animated } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Config from 'react-native-config';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container, PointNotationContainer, PointNotationTextViewContainer, PointTriangle, PointNotationText,
} from './styles';
import mapBoxApi from '../../services/mapBoxApi';

MapboxGL.setAccessToken(Config.MAPBOX_ACCESSTOKEN);
Geolocation.setRNConfiguration({
  authorizationLevel: 'whenInUse',
  skipPermissionRequests: false,
});

interface Stores{

    id:string;
    text:string;
    geometry:{
      coordinates:number[]
    };
    place_name: string;
  }

const StoreMap:React.FC = () => {
  const expand = useRef(new Animated.Value(0)).current;
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [storeLocations, setStoreLocations] = useState<Stores[]>();
  const [showPoint, setShowPoint] = useState('');

  const handleShowInfo = useCallback((item:string) => {
    setShowPoint(item);
  }, []);

  useEffect(() => {
    Animated.timing(expand, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      MapboxGL.setTelemetryEnabled(false);
      MapboxGL.requestAndroidLocationPermissions();
      Geolocation.getCurrentPosition((info) => {
        setCoordinates([info.coords.longitude, info.coords.latitude]);
      });
    });
  }, []);
  useEffect(() => {
    if (coordinates.length > 0) {
      const getStores = async () => {
        const response = await mapBoxApi.get(`/livraria.json?proximity=${coordinates}&access_token=${Config.MAPBOX_ACCESSTOKEN}`);
        setStoreLocations(response.data.features);
      };
      getStores();
    }
  }, [coordinates]);
  const renderPointOfAnotations = () => storeLocations?.map((s) => (
    <MapboxGL.PointAnnotation onSelected={() => handleShowInfo(s.id)} key={s.id} id={s.id} coordinate={[s.geometry.coordinates[0], s.geometry.coordinates[1]]}>

      <PointNotationContainer>
        <PointNotationTextViewContainer showInfo={showPoint === s.id}>
          <PointNotationText>{s.text}</PointNotationText>
          <PointNotationText>
            {s.place_name}
          </PointNotationText>
        </PointNotationTextViewContainer>
        <PointTriangle showInfo={showPoint === s.id} />

        <Icon name="room" size={32} color="red" />

      </PointNotationContainer>

    </MapboxGL.PointAnnotation>
  ));

  return (

    storeLocations !== undefined && storeLocations.length > 0
      ? (
        <Container
          style={{
            flex: expand,
          }}
        >
          <MapboxGL.MapView
            zoomEnabled
            style={{ flex: 1 }}
          >
            <MapboxGL.Camera

              centerCoordinate={coordinates}
              defaultSettings={{ centerCoordinate: coordinates, zoomLevel: 16 }}
              followUserLocation
            />
            {
         renderPointOfAnotations()
        }
            <MapboxGL.PointAnnotation id="view1" coordinate={coordinates}>
              <Icon name="room" size={45} color="red" />

            </MapboxGL.PointAnnotation>
          </MapboxGL.MapView>
        </Container>
      )
      : null

  );
};
export default StoreMap;
