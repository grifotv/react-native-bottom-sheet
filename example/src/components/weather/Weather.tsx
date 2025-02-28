import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { Extrapolate, interpolate } from 'react-native-reanimated';
import { useAppearance } from '../../hooks';
import Text from '../text';

interface WeatherProps {
  animatedPosition: Animated.Node<number>;
  snapPoints: number[];
}

const Weather = ({ animatedPosition, snapPoints }: WeatherProps) => {
  // hooks
  const { appearance } = useAppearance();

  // styles
  const containerStyle = useMemo(
    () => ({
      ...styles.container,
      backgroundColor: appearance === 'dark' ? '#333' : '#FCFCFC',
      transform: [
        {
          translateY: interpolate(animatedPosition, {
            inputRange: [snapPoints[0], snapPoints[1]],
            outputRange: [-snapPoints[0], -snapPoints[1]],
            extrapolate: Extrapolate.CLAMP,
          }),
        },
        {
          scale: interpolate(animatedPosition, {
            inputRange: [snapPoints[1], snapPoints[2]],
            outputRange: [1, 0],
            extrapolate: Extrapolate.CLAMP,
          }),
        },
      ],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [snapPoints, appearance]
  );
  return (
    <Animated.View style={containerStyle}>
      <Text style={styles.label}>☁️12°</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    padding: 2,
    borderRadius: 4,
  },
  label: {
    fontSize: 16,
  },
});

export default Weather;
