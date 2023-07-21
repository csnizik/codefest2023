// SlideInCardComponent.js
import React, { useEffect, useRef } from 'react'
import { StyleSheet, Animated, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const SlideInCardComponent = ({ position, direction, children }) => {
  const slideAnim = useRef(
    new Animated.Value(
      direction === 'right' ? width : direction === 'left' ? -width : 0
    )
  ).current

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: direction === 'left' ? -width : 0,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [direction])

  const cardPosition = {
    top: position === 'top' ? 0 : 'auto',
    bottom: position === 'bottom' ? 0 : 'auto',
    middle: position === 'middle' ? height / 2 : 'auto',
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
    height: height / 2,
    backgroundColor: 'white',
  },
})

export default SlideInCardComponent
