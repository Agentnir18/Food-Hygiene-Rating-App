import React ,{ useState , useEffect} from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Link } from 'expo-router';

//NPM Package(API)

const fhrs = require('food-hygiene-ratings'),
client = new fhrs.Client();

const Details = ({establishment}) => {
  // Parse the date string
  const date = new Date(establishment.RatingDate);
  const[descriptiors, setDescriptors] = useState([]);
  const [error, setError] = useState(null);
  
  // Format the date
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-GB', options);

  //retrieves the category based on the numbers from the API Data Source
  const getScoreDescription = (score) => {
    switch (score) {
      case 0:
        return 'Very good';
      case 5:
        return 'Good';
      case 10:
        return 'Generally Satisfactory';
      case 15:
        return 'Improvement Necessary';
      case 20:
        return 'Major Improvement Necessary';
      case 30:
        return 'Urgent Improvement Necessary';
      default:
        return 'N/A';
    }
  }

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
// Tabular Data
  const state = {
    tableHead: ['Area inspected by food safety officer', 'Standards found'],
    tableData: [
      ['Hygienic food handling \nHygienic handling of food including preparation, cooking, re-heating, cooling and storage', getScoreDescription(establishment.scores.Hygiene)],
      ['Cleanliness and condition of facilities and building \nCleanliness and condition of facilities and building (including having appropriate layout, ventilation, hand washing facilities and pest control) to enable good food hygiene', getScoreDescription(establishment.scores.Structural)],
      ['Management of food safety \nSystem or checks in place to ensure that food sold or served is safe to eat, evidence that staff know about food safety, and the food safety officer has confidence that standards will be maintained in future', getScoreDescription(establishment.scores.ConfidenceInManagement)]
    ]
  }
//Retrieves Score Description from the API Data Source
  useEffect(() => {
    client.scoreDescriptors
      .getScoreDescriptors(establishment.FHRSID) // Fix: Pass establishment ID directly
      .then(function (response) {
        if (response.data && response.data.scoreDescriptors) {
          setDescriptors(response.data.scoreDescriptors);
        }
      })
      .catch(function (error) {
        setError(error);
      });
  }, [establishment.FHRSID]);
  
  //Structure of details page
  return (
    <BottomSheetScrollView showsVerticalScrollIndicator={false}>
        
        <Text style={styles.address}>{establishment.AddressLine1}</Text>
        <Text style={styles.address}>{establishment.AddressLine2}</Text>
        <Text style={styles.address}>{establishment.AddressLine3}</Text>
        <Text style={styles.address}>{establishment.AddressLine4}</Text>
        <Text style={styles.address}>{establishment.PostCode}</Text>
        <Text style={styles.businessType}>{establishment.BusinessType}</Text>
        <Text style={styles.date}>Date of Inspection: {formattedDate}</Text>
        <View style={{marginVertical: 10,alignItems:'center'}}>
          
          <Image source={getImage(establishment.RatingValue)} style={styles.image}/>
        </View>

        <Text style={styles.sectionTitle}>Standards found at the time of inspection</Text>

        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}} style={{marginBottom:10}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={state.tableData} textStyle={styles.text}/>
        </Table>
        
        <View style={styles.localAuthorityContainer}>
          <Text style={styles.subTitle}>Local Authority</Text>
          <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
            <View>
            <Text style={styles.info}>Name: </Text>
            <Text style={styles.info}>Website:</Text>
            <Text style={styles.info}>Email:</Text>
            </View>
            <View style={{alignItems:'flex-end'}}>
            <Text style={styles.info}>{establishment.LocalAuthorityName}</Text>
            <Link style={styles.info} href={establishment.LocalAuthorityWebSite}>{establishment.LocalAuthorityWebSite}</Link>
            <Text style={styles.info}>{establishment.LocalAuthorityEmailAddress}</Text>
            </View>
          </View>
          <View style={{marginTop: 10,alignItems:'center'}}>
          </View>
        </View>
        
    </BottomSheetScrollView>
  )
}

const styles = StyleSheet.create({
  address: {
    fontSize: 14,
  },
  businessType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  image: {
    width: 271,
    height: 150,
    objectFit: 'contain'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  localAuthorityContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    marginBottom: 5,
  },
  head: {  
    backgroundColor: '#f1f8ff' 
  },
  text: { 
    margin: 6 
  },
});

export default Details