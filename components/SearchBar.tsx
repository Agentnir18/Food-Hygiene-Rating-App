import React, { useState, useEffect } from 'react';
import { Alert,Text, View, StyleSheet, TextInput, ActivityIndicator, Button, Pressable, Share } from 'react-native';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EstablishmentListItem from '../components/ListItem';
import StartBottom from '../components/StartBottom';
import Details from '../components/Details';
//import Bookmark from '../app/bookmark';
import { Ionicons } from '@expo/vector-icons';
import FilterPage from '../components/Filter';

//NPM Package(API)
const fhrs = require('food-hygiene-ratings'),
client = new fhrs.Client();


const SearchBar = ({onDataFiltered}) => {
  //use state variables
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedEstablishment, setSelectedEstablishment] = useState(null);
  const [showFilterPage, setShowFilterPage] = useState(false);
  const [currentPageSize, setCurrentPageSize] = useState(5);
  const [allItemsLoaded, setAllItemsLoaded] = useState(false);

  useEffect(() => {
    // Set loading state to true when initiating the search
    setIsLoading(true);

    // Call the API to search for establishments based on searchQuery and currentPageSize
    client.establishments
      .searchEstablishments({ name: searchQuery, pageSize: currentPageSize })
      .then(function (response) {
        // If the response contains establishments data
        if (response.data && response.data.establishments) {
          // Update the data state with the received establishments
          setData(response.data.establishments);
          console.log('Data:', data);
        }

        // Check if all items have been loaded
        if (response.data && response.data.establishments.length < currentPageSize) {
          setAllItemsLoaded(true);
        }

        // Set loading state to false after fetching data
        setIsLoading(false);
      })
      .catch(function (error) {
        // If there's an error, set the error state
        setError(error);
        // Set loading state to false
        setIsLoading(false);
        // Log the error for debugging purposes
        console.log(error);
      });
  }, [searchQuery, currentPageSize]);


  const handleSearch = () => {
    // Filter the establishment data based on searchQuery
    const filteredResults = data.filter((fildata) =>
      fildata.BusinessName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    //console.log('Filtered DATA:',filteredResults);
    onDataFiltered(filteredResults);
  };

  //Retrieving Filtered data from Filterpage
  const applyFilter = (rating: string, type: string, status: string) => {
    let filteredResults = data;
    if (rating !== 'All') {
      filteredResults = filteredResults.filter(
        (establishment) => establishment.RatingValue === rating
      );
    }
    if (type !== 'All') {
      filteredResults = filteredResults.filter(
        (establishment) => establishment.BusinessType === type
      );
    }
    if (status !== 'All') {
      filteredResults = filteredResults.filter(
        (establishment) => establishment.RatingKey === status
      );
    }
    console.log('After Filtering:', filteredResults);
    setData(filteredResults);
    setShowFilterPage(false);
  };
// triggers the filter page
  const openFilterPage = () => {
    setShowFilterPage(true);
  };

  //loads more results
  const loadMoreItems = () => {
    setCurrentPageSize(currentPageSize + 5);
    handleSearch();
    applyFilter;
    console.log('Loading more items and current size '+ currentPageSize); 
  }

  // Render message when all items have been loaded
  const renderNoMoreItems = () => {
    return <Text style={{ alignSelf: 'center', marginTop: 20 }}>No more items to show</Text>;
  };

  //Shares the selected establishment using API
  const onShare = async (selectedEstablishment) => {
    try {
      // Use Share API to share establishment details and location link
      const msg = await Share.share({
        message: 'Check out this establishment: ' + selectedEstablishment.BusinessName + '\nLink: ' + `https://www.google.com/maps/search/?api=1&query=${selectedEstablishment.geocode.latitude},${selectedEstablishment.geocode.longitude}`,
      });
      // Handle different share action types
      if (msg.action === Share.sharedAction) {
          console.log('Shared');
      } else if (msg.action === Share.dismissedAction) {
        // Log 'Dismissed' if the share action is dismissed
        console.log('Dismissed');
      }
    } catch (error) {
      // Handle errors that occur during sharing
      console.log('Error sharing: ', error.message);
    }
  }


//Bookmark Function
const Bookmark = async (selectedEstablishment) => {
  try {
    // Get existing bookmarks from AsyncStorage
    const existingBookmarksJson = await AsyncStorage.getItem('bookmarks');
    let existingBookmarks = [];
    if (existingBookmarksJson) {
      existingBookmarks = JSON.parse(existingBookmarksJson);
    }

    // Check if the selected establishment already exists in bookmarks
    const alreadyBookmarked = existingBookmarks.some(bookmark => bookmark.FHRSID === selectedEstablishment.FHRSID);

    // If it's not already bookmarked, add it
    if (!alreadyBookmarked) {
      // Add the new selected establishment to the existing bookmarks
      existingBookmarks.push(selectedEstablishment);
     Alert.alert('Added To Bookmarks', 'This establishment is bookmarked.');
      // Save the updated bookmarks back to AsyncStorage
      await AsyncStorage.setItem('bookmarks', JSON.stringify(existingBookmarks));
    } else {
      // If it's already bookmarked, send a notification
      Alert.alert('Duplicate Bookmark', 'The bookmark is already added');
    }
  } catch (error) {
    // Handle error saving data
    console.error('Error saving bookmark:', error);
  }
};


  if (selectedEstablishment){
    console.log("Selected : ",selectedEstablishment);

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
        {/* Close button and title section */}
        <View style={styles.headingContainer}>
        <Text style={styles.title}>{selectedEstablishment.BusinessName}</Text>
        </View>
          <Pressable style={styles.closeButton}  onPress={() => {setSelectedEstablishment(null)}}>
            <Ionicons name="close" size={24} color="black" />
          </Pressable>
        </View>
        {/* Details component */}
        <Details establishment={selectedEstablishment} />
        {/* Buttons section */}
        <View style={styles.buttonContainer}>
          <Pressable style={styles.belowButton}  onPress={() => {Bookmark(selectedEstablishment)}}> 
            <Ionicons name="bookmark-outline" size={24} color="black" />
            <Text>Bookmark </Text>
          </Pressable>
          <Pressable style={styles.belowButton}  onPress={() => {onShare(selectedEstablishment)}}>
            <Ionicons name="share" size={24} color="black" />
            <Text>Share</Text>
          </Pressable>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* Text Component */}
      <TextInput
        style={styles.searchQuery}
        clearButtonMode='always'
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
        placeholder="Search business name"
        onSubmitEditing={handleSearch} // Handle search when submitted
      />

       {/* Display Results when data is available and Filter Options when set to true */}
      {searchQuery ? (
        data.length > 0 ? (
        showFilterPage ? (
          <FilterPage applyFilter={applyFilter} />
        ) : (
          // results list
          <BottomSheetFlatList
            data={data} // Use filtered results to render
            keyExtractor={(item) => item.FHRSID.toString()}
            contentContainerStyle={{ gap: 10}}
            ListHeaderComponent={
              <Button title="Filter" onPress={() => openFilterPage()} />
            }
            renderItem={({ item }) => (
              <EstablishmentListItem establishment={item} onPress={() => {setSelectedEstablishment(item)}} />)}
            ListFooterComponent={
                allItemsLoaded ? renderNoMoreItems() :
            <View style={{marginVertical: 16, alignItems:'center'}}>
              <ActivityIndicator size="large" color="green" />
            </View>}
            onEndReached={loadMoreItems} 
            onEndReachedThreshold={0}
          />
        )
      ):(<Text style={{alignSelf:'center'}}>No Results</Text>)) : (
        <StartBottom />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  closeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    width: 40,
    height: 40,
    borderRadius: 7,
  },
  belowButton: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 7,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headingContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  searchQuery: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
});

export default SearchBar;
