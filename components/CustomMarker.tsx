import { View, Text } from 'react-native';
import React from 'react';
import { Marker } from 'react-native-maps';

const CustomMarker = ({ establishment, onPress }) => {
  return (
    // Create a marker on the map with an onPress event handler
    <Marker
      onPress={onPress}
      coordinate={{
        // Set the marker's coordinate based on the establishment's geolocation
        latitude: parseFloat(establishment.geocode.latitude),
        longitude: parseFloat(establishment.geocode.longitude),
      }}
    >
      {/* Display a custom view as the marker */}
      <View
        style={{
          backgroundColor: 'white',
          padding: 5,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 20,
        }}
      >
        {/* Display the establishment's rating */}
        <Text>{establishment.RatingValue}/5</Text>
      </View>
    </Marker>
  );
};

export default CustomMarker;