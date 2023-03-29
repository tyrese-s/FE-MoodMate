import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Button, Image, View, Text , StyleSheet} from 'react-native';
import onSubmit from './utils/helperFunctions';

function QuoteUploader() {
    const [image, setImage] = useState(null);
    const [text, setText] = useState("Please add an image");
    
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app access to your photos!");
      return;
    }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        base64: true,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri as never);
        setText("Loading..");
        const responseData = await onSubmit(result.assets[0].base64);
        setText(responseData.text);
      }
    };

    const openCamera = async () => {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
      if (permissionResult.granted === false) {
        alert("You've refused to allow this app access to your camera!");
        return;
      }

      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        base64: true,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri as never);
        setText("Loading..");
        const responseData = await onSubmit(result.assets[0].base64);
        setText(responseData.text);
      }
    }
  
    return (
      <View> 
        <View style={styles.buttonContainer}>
          <Button title="Image Library" onPress={pickImage} />
          <Button onPress={openCamera} title="Take Photo" />
        </View>

        <View style={styles.imageContainer}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 400, height: 300, resizeMode: "contain" }}
            />
          )}
          <Text>{text}</Text>
        </View>
      </View>
    ); 
}
  
export default QuoteUploader;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 400,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  imageContainer: {
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    // height:'65%'
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: 'cover',
  }
});