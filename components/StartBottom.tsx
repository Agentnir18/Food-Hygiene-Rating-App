import React  from 'react'
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Image } from 'react-native';

//Structure for Info Page
const StartBottom = () => {
    return (
      <View style={styles.container}>
      <BottomSheetScrollView>    
            <Image
              source={require('../assets/FHRS rating scores.jpg')}
              style={styles.image}/>
            <Text style={styles.text}>
             The score you get carries the same interpretations throughout the rest of the UK.
              A rating sticker representing your score is handed to you which is required to be posted in any easily spotted part of
              your food establishment for consumers to see. Similarly, your score is also accessible online and can even be requested 
              to be displayed on your digital platforms. The rating scheme shows the state of food hygiene practices of your food 
              business during the time of inspection
            </Text>
      </BottomSheetScrollView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image:{
      width: 400,
      height: 400,
      resizeMode: 'contain'
    },
    text: {
      fontSize: 14,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 10,
    },
  });
  
  export default StartBottom;