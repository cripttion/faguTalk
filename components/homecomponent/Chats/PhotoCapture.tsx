import { Colors } from "@/constants/Colors";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PhotoCapture({ setData, closeCamera }) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      console.log(photo.base64);
      setData(photo.base64);
      closeCamera(false);
      // Do something with the photo, like saving it to the file system or uploading it
    }
  };
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.controlContainer}>
          <TouchableOpacity
            onPress={closeCamera(true)}
            style={styles.flashButton}
          >
            <AntDesign
              name={"closecircle"}
              size={40}
              color={Colors.dark.green_Icon}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={takePicture} style={styles.shutterButton}>
            <Ionicons
              name="heart-circle-outline"
              size={70}
              color={Colors.dark.green_Icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={toggleCameraFacing}
            style={styles.flipButton}
          >
            <MaterialIcons
              name="flip-camera-ios"
              size={40}
              color={Colors.dark.green_Icon}
            />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  controlContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly", // Center the buttons within the container
    alignItems: "center",
    paddingBottom: 30,
    marginHorizontal: 20,
  },
  shutterButton: {},
  flipButton: {},
  flashButton: {},
});
