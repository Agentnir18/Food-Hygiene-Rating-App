import { View, Text, StyleSheet, Image, ViewStyle, Pressable } from 'react-native';
import React from 'react';

type ListItem = {
  containerStyle?: ViewStyle;
};
//Retrieves the Selected Establishment Data from the Search Bar
const ListItem = ({
  establishment,
  containerStyle, onPress,
}: ListItem) => {
  // Parse the date string
  const date = new Date(establishment.RatingDate);
  
  // Format of the date
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-GB', options);

  //retrieves the image based on the numbers from the API Data Source
  const getImage = (score:string) => {
    switch (score) {
      case "0":
        return require("../assets/images/review-images/fhrs/fhrs_0_en-gb.png");
      case "1":
        return require("../assets/images/review-images/fhrs/fhrs_1_en-gb.png");
      case "2":
        return require("../assets/images/review-images/fhrs/fhrs_2_en-gb.png");
      case "3":
        return require("../assets/images/review-images/fhrs/fhrs_3_en-gb.png");
      case "4":
        return require("../assets/images/review-images/fhrs/fhrs_4_en-gb.png");
      case "5":
        return require("../assets/images/review-images/fhrs/fhrs_5_en-gb.png");
      case "Pass":
        return require("../assets/images/review-images/fhrs/fhrs_ratingawaited_en-gb.png");
      case "ImprovementRequired":
        return require("../assets/images/review-images/fhrs/fhrs_0_en-gb.png");
      case "AwaitingPublication":
        return require("../assets/images/review-images/fhrs/fhrs_awaitingpublication_en-gb.png");
      case "AwaitingInspection":
        return require("../assets/images/review-images/fhrs/fhrs_awaitinginspection_en-gb.png");
      case "Exempt":
        return require("../assets/images/review-images/fhrs/fhrs_exempt_en-gb.png");
      default:
        return require("../assets/images/review-images/fhrs/fhrs_0_en-gb.png");
    }
  }

  //structure of Result List
  return (
    <Pressable style={[styles.card, containerStyle]} onPress={onPress}>
      <View style={styles.rightContainer}>
        <Text style={styles.title}>{establishment.BusinessName}</Text>
        <Text style={styles.description}>
          {establishment.AddressLine1} 
        </Text>
        <Text style={styles.description}>
          {establishment.AddressLine2} 
        </Text>
        <Text style={styles.description}>
          {establishment.AddressLine3} 
        </Text>
        <Text style={styles.description}>
          {establishment.AddressLine4} 
        </Text>
        <Text style={styles.description}>
          {establishment.PostCode} 
        </Text>

        <View style={styles.footer}>
          <Text style={styles.price}>Last Inspection: {formattedDate}</Text>
        </View>
      </View>
      <Image source={getImage(establishment.RatingValue)} style={styles.image}/>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',

    flexDirection: 'row',
    borderRadius: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    marginHorizontal: 5,
  },
  image: {
    width: 150,
    objectFit: 'contain',
    alignSelf: 'center',
    marginRight: 10,
  },
  rightContainer: {
    padding: 10,
    flex: 1,
  },
  title: {
    marginBottom: 10,
    fontSize: 16,
  },
  description: {
    color: 'gray',
  },
  price: {
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
});

export default ListItem;