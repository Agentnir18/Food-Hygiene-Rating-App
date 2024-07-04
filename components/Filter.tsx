import React, { useState } from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';


const FilterPage = ({ applyFilter }: { applyFilter: Function }) => {
  const [rating, setRating] = useState('All');
  const [type, setType] = useState('All');
  const [status, setStatus] = useState('All');

//Filter Data passed to Search Bar
  const handleApplyFilter = () => {
    applyFilter(rating,type,status);
  };

  //structure of filter page
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hygiene Rating:</Text>
      <Picker
        selectedValue={rating} style={styles.picker} 
        onValueChange={(itemValue) => setRating(itemValue)}
      >
        <Picker.Item label="All" value="All" />
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
      </Picker>
      
      <Text style={styles.title}>Business Type:</Text>
      <Picker style={styles.picker} selectedValue={type} onValueChange={(itemValue) => setType(itemValue)}>
        <Picker.Item label="All" value="All" />
        <Picker.Item label="Transporters" value="Distributors/Transporters" />
        <Picker.Item label="Farmers" value="Farmers/growers" />
        <Picker.Item label="Hospitals/Childcare/Caring Premises" value="Hospitals/Childcare/Caring Premises" />
        <Picker.Item label="Hotel/Guest House" value="Hotel/bed & breakfast/guest house" />
        <Picker.Item label="Importers/Exporters" value="Importers/Exporters" />
        <Picker.Item label="Manufacterers/Packers" value="Manufacturers/packers" />
        <Picker.Item label="Mobile Caterer" value="Mobile caterer" />
        <Picker.Item label="Other Catering Premises" value="Other catering premises" />
        <Picker.Item label="Night Club" value="Pub/bar/nightclub" />
        <Picker.Item label="Resturants/Cafe" value="Restaurant/Cafe/Canteen" />
        <Picker.Item label="Retailers - other" value="Retailers - other" />
        <Picker.Item label="Retailers - Supermarkets" value="Retailers - supermarkets/hypermarkets" />
        <Picker.Item label="School/College/University" value="School/college/university" />
        <Picker.Item label="Takeaway/Sandwich Shops" value="Takeaway/sandwich shop" />
      </Picker>

      <Text style={styles.title}>Hygiene Status:</Text>
      <Picker style={styles.picker} selectedValue={status} onValueChange={(itemValue) => setStatus(itemValue)}>
        <Picker.Item label="All" value="All" />
        <Picker.Item label="Pass" value="Pass" />
        <Picker.Item label="Improvement Required" value="ImprovementRequired" />
        <Picker.Item label="Awaiting Publication" value="AwaitingPublication" />
        <Picker.Item label="Awaiting Inspection" value="AwaitingInspection" />
        <Picker.Item label="Exempt" value="Exempt" />
      </Picker>

      <Button title="Apply Filter" onPress={handleApplyFilter} />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    backgroundColor: '#eee',
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 5,
    width: '70%',
    height:'25%'
  },
});

export default FilterPage;