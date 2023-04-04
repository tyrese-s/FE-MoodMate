import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Button,
  Image,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import UploadForm from "./UploadForm";
import onSubmit from "./utils/helperFunctions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { images } from "../assets/Images";
import { Card } from "react-native-paper";

function QuoteUploader() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("Please add an image");
  const [hasImage, setHasImage] = useState(false);

  const pickImage = async () => {
    setHasImage(false);
    setText("Loading...");
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

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
      setHasImage(true);
    }
  };

  const openCamera = async () => {
    setHasImage(false);
    setText("Loading...");
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
      setHasImage(true);
    }
  };

  return (
    <View style={styles.layout}>
    <KeyboardAwareScrollView style={styles.scrollview}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Card style={styles.quoteButtons}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Library</Text>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={openCamera}>
          <Card style={styles.quoteButtons}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Camera</Text>
          </Card>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        {hasImage && image && (
          <Image
            source={{ uri: image }}
            style={{ width: 400, height: 300, resizeMode: "contain"}}
          />
        )}
        {hasImage ? (
          <UploadForm text={text} setText={setText} setHasImage={setHasImage} />
        ) : (
          <Text
            style={{
              color: "white",
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 2,
                textShadowColor: "black",
                fontWeight: 'bold',
              paddingTop: 32,
              fontSize: 16,
            }}
          >
            {text}
          </Text>
        )}
      </View>
    </KeyboardAwareScrollView>
      <ImageBackground
        style={[styles.fixed, styles.background, { zIndex: -1 }]}
        source={images.background}
        imageStyle={{ opacity: 0.7 }}
      />
    </View>
  );
}

export default QuoteUploader;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: "#83C5BE",
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 8,
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 300,
    height: 225,
    resizeMode: "cover",
  },
  background: {
    width: Dimensions.get("window").width, //for full screen
    height: Dimensions.get("window").height, //for full screen
  },
  fixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollview: {
    backgroundColor: "transparent",
  },
  quoteButtons: {
    justifyContent: "center",
    backgroundColor: "#006D77",
    height: 40,
    width: 120,
    borderRadius: 20,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 2,
  },
});
