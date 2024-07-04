import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet,Pressable, FlatList,Button } from 'react-native';
import ListItem from '../components/ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View} from '../components/Themed';
import { useState ,useEffect} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function BookmarkScreen(establishment) {
  console.log("Checking: ",establishment);

  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const bookmarksJson = await AsyncStorage.getItem('bookmarks');
        if (bookmarksJson) {
          const parsedBookmarks = JSON.parse(bookmarksJson);
          setBookmarks(parsedBookmarks);
        }
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    };

    fetchBookmarks();
  }, []);

  const deleteBookmark = async (index) => {
    try {
      const updatedBookmarks = [...bookmarks];
      updatedBookmarks.splice(index, 1);
      await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      setBookmarks(updatedBookmarks);
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    }
  };

  const renderItem = ({ item, index }: { item: ListItem, index: number }) => (
  <View style={{ flex: 1, alignItems: "center", width: 350 }}>
    <ListItem establishment={item} />

    {/* Render other bookmark properties as needed */}
    <Pressable style={styles.trashButton} onPress={() => deleteBookmark(index)}>
        <Ionicons name="trash" size={24} color="black" />
    </Pressable>
  </View>
);


   return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.closeButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back-sharp" size={24} color="black" />
        </Pressable>
        <View style={styles.headingContainer}>
          <Text style={styles.title}>Bookmark</Text>
        </View>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
        data={bookmarks}
        contentContainerStyle={{gap:20}}
        renderItem={renderItem}
         keyExtractor={(item, index) => index.toString()}
      />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  headingContainer: {
    flex: 1,
    alignItems: 'center',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
  closeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    width: 40,
    height: 40,
    borderRadius: 7,
  },
  trashButton: {
    position:'absolute',
    right: 20,
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    width: 40,
    height: 40,
    borderRadius: 7,
  },
});