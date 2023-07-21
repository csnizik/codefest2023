import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const SlideInCardComponent = ({ position, direction, question, answer, title }) => {
  const slideAnim = useRef(
    new Animated.Value(direction === 'right' ? width : -width)
  ).current

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [])

  const cardPosition = {
    top: position === 'top' ? 0 : 'auto',
    bottom: position === 'bottom' ? 0 : 'auto',
    middle: position === 'middle' ? height / 3 : 'auto',
  }

  return (
    <Animated.View
      style={[
        styles.card,
        { transform: [{ translateX: slideAnim }] },
        cardPosition,
      ]}
    >
      {children}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: '100%',
    height: height / 3,
    backgroundColor: 'white',
  },
})

export default SlideInCardComponent
