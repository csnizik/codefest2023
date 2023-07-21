// MainComponent.js
import React, { useState, useEffect } from 'react'
import { StatusBar, Animated } from 'expo-status-bar'
import { StyleSheet, View, Text, Button, ToastAndroid } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import LocationComponent from '../components/LocationComponent'
import SlideInCardComponent from '../components/SlideInCardComponent'
import { getCityName } from '../api/GetCityName'

export default function MainComponent() {
  const [location, setLocation] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [direction, setDirection] = useState('right')
  const [gameStarted, setGameStarted] = useState(false)

  const questions = [
    {
      text: 'What is the answer to life, the universe, and everything?',
      choices: ['24', '99', '42', '33'],
      answer: '42',
    },
    {
      text: "Why don't ants ever get sick?",
      choices: [
        'They have tiny ant doctors',
        'They live in sterile environments',
        'They have exoskeletons',
        'Antibodies',
      ],
      answer: 'Antibodies',
    },
    {
      text: 'Why do we never see a hippopotamus hiding in a tree?',
      choices: [
        'Trees are not strong enough',
        'Hippos cannot climb',
        'Hippos are afraid of heights',
        'Because they’re really good at it',
      ],
      answer: 'Because they’re really good at it',
    },
    {
      text: 'Why do we tell actors to "break a leg"?',
      choices: [
        'To make them bend their knees',
        'Because every play has a cast',
        'It’s a reverse psychology',
        'To scare them',
      ],
      answer: 'Because every play has a cast',
    },
    {
      text: 'Why was the computer cold?',
      choices: [
        'It left its Windows open',
        'It had too many fans',
        'It was surfing the web too much',
        'It didn’t have a warm keyboard',
      ],
      answer: 'It left its Windows open',
    },
  ]

  useEffect(() => {
    setDirection('right')
  }, [currentQuestionIndex])

  const handleChoiceSelection = (selectedChoice) => {
    const { answer } = questions[currentQuestionIndex]
    if (selectedChoice === answer) {
      ToastAndroid.show('Correct answer!', ToastAndroid.SHORT)
      setScore(score + 1)
      setDirection('left')
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
        setTimeout(() => {
          setDirection('right')
        }, 1500)
      }, 1000)
    } else {
      ToastAndroid.show('Incorrect answer! Try again', ToastAndroid.SHORT)
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
            {console.log(location)}
            {!gameStarted ? (
              <View style={styles.startView}>
                <Text style={styles.title}>`${getCityName(coords.latitude, coords.longitude)} Quiz`</Text>
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
                            style={{ fontSize: 24 }}
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
    paddingLeft: 30,
    paddingRight: 30
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
