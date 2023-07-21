// MainComponent.js
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Text, Button } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import LocationComponent from '../components/LocationComponent'
import SlideInCardComponent from '../components/SlideInCardComponent'

export default function MainComponent() {
  const [location, setLocation] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [direction, setDirection] = useState('right')
  const [gameStarted, setGameStarted] = useState(false)

  const questions = [
    {
      text: 'Question 1',
      choices: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
      answer: 'Choice 1',
    },
    {
      text: 'Question 2',
      choices: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
      answer: 'Choice 2',
    },
    // More questions...
  ]

  useEffect(() => {
    setDirection('right')
  }, [currentQuestionIndex])

  const handleChoiceSelection = (selectedChoice) => {
    const { answer } = questions[currentQuestionIndex]
    if (selectedChoice === answer) {
      alert('Correct answer!')
      setScore(score + 1)
      setDirection('left')
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
      }, 500)
    } else {
      alert('Incorrect answer! Try again')
    }
  }

  return (
    <>
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <LocationComponent onLocationSet={setLocation} />
        {location && (
          <>
            <MapView
              style={styles.mapStyle}
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0322,
                longitudeDelta: 0.0221,
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title={'Your location'}
              />
            </MapView>
            {!gameStarted ? (
              <View style={styles.startView}>
                <Text style={styles.title}>App Title</Text>
                <Button
                  title="Start Game"
                  onPress={() => setGameStarted(true)}
                />
              </View>
            ) : (
              <SlideInCardComponent position="top" direction={direction}>
                {currentQuestionIndex < questions.length ? (
                  <>
                    <Text style={styles.cardText}>
                      {questions[currentQuestionIndex]?.text}
                    </Text>
                    {questions[currentQuestionIndex]?.choices.map(
                      (choice, index) => (
                        <View style={styles.buttonGroup} key={index}>
                          <Button
                            title={choice}
                            onPress={() => handleChoiceSelection(choice)}
                          />
                        </View>
                      )
                    )}
                  </>
                ) : (
                  <View style={styles.endCard}>
                    <Text style={styles.cardText}>Thank you for playing</Text>
                    <Text style={styles.cardText}>Your score: {score}</Text>
                  </View>
                )}
              </SlideInCardComponent>
            )}
          </>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#008080',
  },
  mapStyle: {
    flex: 1,
    height: '50%',
    width: '100%',
  },
  cardText: {
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
    fontSize: 25,
  },
  buttonGroup: {
    marginTop: 20,
  },
  endCard: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  startView: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#FF6347',
    textAlign: 'center',
    marginBottom: 20,
  },
})
