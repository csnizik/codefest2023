import { useEffect, useState } from "react";
import { GetTriviaQuestions } from "../api/GetTriviaQustions";
import { Button, Text, View, StyleSheet } from "react-native";

const QuestionPage = ({ cityName }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const asyncFunc = (cityName) => {
      return GetTriviaQuestions(cityName);
    };
    const data = asyncFunc(cityName);
    setQuestions(data);
    setAnswers(new Array(data.length).fill("n/a"));
  }, []);

  const handleClick = (questionChoice) => {
    if (questions[questionChoice[0]].answer === questionChoice[1]) {
      const arr = [...answers];
      arr[questionChoice[0]] = "Correct";
      setAnswers([...arr]);
    } else {
      const arr = [...answers];
      arr[questionChoice[0]] = "Incorrect";
      setAnswers([...arr]);
    }
  };

  return (
    <View style={styles.view}>
      {questions &&
        questions.map((question, qIdx) => {
          return (
            <View key={`q${qIdx}`}>
              {answers[qIdx] !== "n/a" && <Text>{answers[qIdx]}</Text>}
              <Text>{question.text}</Text>

              {question.choices.map((choice, cIdx) => {
                return (
                  <View key={`c${cIdx}`}>
                    <Button
                      style={styles.button}
                      title={choice}
                      onPress={() => {
                        handleClick([qIdx, cIdx]);
                      }}
                    />
                  </View>
                );
              })}
            </View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: "3%",
  },
  button: {
    width: "90%",
  },
  title: {
    margin: "1%",
  },
});

export default QuestionPage;
