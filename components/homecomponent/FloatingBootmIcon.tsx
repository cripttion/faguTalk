import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import * as React from "react";
import { FAB, Portal, PaperProvider } from "react-native-paper";

const FloatingBootmIcon = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <PaperProvider>
      <Portal>
        <FAB.Group
          color={"#222"}
          fabStyle={{ backgroundColor: Colors.dark.green_Icon }}
          backdropColor="#fff"
          open={open}
          visible
          icon={open ? "calendar-today" : "plus"}
          actions={[
            {
              icon: "plus",
              label: "Contacts",
              onPress: () => router.navigate("(stackScreens)/contacts"),
              labelTextColor: "#222",
            },
            {
              icon: "star",
              label: "Star",
              onPress: () => router.navigate("(stackScreens)/contacts"),
              labelTextColor: "#222",
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </PaperProvider>
  );
};

export default FloatingBootmIcon;
