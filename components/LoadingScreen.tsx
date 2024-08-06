import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, { Easing, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

const svgs = [
  <Svg height="100" width="100" viewBox="0 0 24 24" key="1">
    <Path d="M12 2L2 12h10v10h10V12H12V2z" fill="#000" />
  </Svg>,
  <Svg height="100" width="100" viewBox="0 0 24 24" key="2">
    <Path d="M12 2L2 12h10v10h10V12H12V2z" fill="#555" />
  </Svg>,
  <Svg height="100" width="100" viewBox="0 0 24 24" key="3">
    <Path d="M12 2L2 12h10v10h10V12H12V2z" fill="#888" />
  </Svg>,
  <Svg height="100" width="100" viewBox="0 0 24 24" key="4">
    <Path d="M12 2L2 12h10v10h10V12H12V2z" fill="#bbb" />
  </Svg>,
  <Svg height="100" width="100" viewBox="0 0 24 24" key="5">
    <Path d="M12 2L2 12h10v10h10V12H12V2z" fill="#eee" />
  </Svg>,
];

const LoadingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const progress = useSharedValue(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % svgs.length);
      progress.value = withTiming(0, { duration: 0 });
      progress.value = withTiming(1, { duration: 1000, easing: Easing.linear });
    }, 1000);

    return () => clearInterval(interval);
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.svgContainer, animatedStyle]}>
        {svgs[currentIndex]}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  svgContainer: {
    width: 100,
    height: 100,
  },
});

export default LoadingScreen;
