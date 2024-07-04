import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet,TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CustomMarker from '../components/CustomMarker';
import BottomSheet from '@gorhom/bottom-sheet';
import SearchBar from '../components/SearchBar';
import EstablishmentListItem from '../components/ListItem';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const fhrs = require('food-hygiene-ratings'),
client = new fhrs.Client();


export default function Map() {
    // variables
  const [selectedEstablishment, setSelectedEstablishment] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const snapPoints = useMemo(() => ['10%', '60%', '90%'], []);
  //Initial View Of Map
  const [mapRegion, setMapRegion] = useState({
    latitude: 51.507351,
    longitude: -0.127758,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
 
  //Setter for Filtered Data 
  const handleDataFiltered = (filteredData) => {
    setFilteredData(filteredData);
  };

//console.log('Map:', filteredData);


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View>
      <Stack.Screen options={{ headerShown: false }} />
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={mapRegion}>
        {/* Filtering Non-null Values */}
      {filteredData
        .filter(establishment => 
          establishment.geocode.latitude !== undefined &&
          establishment.geocode.longitude !== undefined &&
          !isNaN(establishment.geocode.latitude) &&
          !isNaN(establishment.geocode.longitude) &&
          establishment.geocode.latitude !== null &&
          establishment.geocode.longitude !== null
        )
        .map((establishment) => (
          <CustomMarker
            key={establishment.FHRSID}
            establishment={establishment}
            onPress={() => setSelectedEstablishment(establishment)}
          />
    ))}
    </MapView>
      {/* Display selected Establishment */}
      {selectedEstablishment && (
          <EstablishmentListItem
            establishment={selectedEstablishment}
            containerStyle={styles.selectedContainer}
          />
        )}
        {/* Bookmark Button */}
      <TouchableOpacity
        key="bookmark"
        style={styles.categoryItem}
        onPress={() =>router.push({pathname: '/bookmark'})} // Navigate to the bookmark page
      >
        <Ionicons name="bookmark-outline" size={24} color="black" />
      </TouchableOpacity>
      {/* BottomSheet */}
      <BottomSheet index={0} snapPoints={snapPoints}> 
      {/* Search Bar */}
       <SearchBar onDataFiltered={handleDataFiltered} />
      </BottomSheet>
    </View>
    </GestureHandlerRootView>
    
  );
}
const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  selectedContainer: {
    position: 'absolute',
    bottom: 100,
    right: 10,
    left: 10,
  }, categoryItem: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});