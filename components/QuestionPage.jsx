import { useEffect, useState } from "react";
import { GetTriviaQuestions } from "../api/GetTriviaQustions";
import { Button, Text, View, StyleSheet } from "react-native";

const QuestionPage = ({ cityName }) => {
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const asyncFunc = (cityName) => {
      return GetTriviaQuestions(cityName);
    };
    const data = asyncFunc(cityName);
    setQuestions(data);
  }, []);

  const handleClick = (questionChoice) => {
    if (questions[questionChoice[0]].answer === questionChoice[1]) {
    } else {
    }
  };

  return (
    <View style={styles.view}>
      {questions &&
        questions.map((question, qIdx) => {
          return (
            <>
              <Text>{question.text}</Text>

              {question.choices.map((choice, cIdx) => {
                return (
                  <>
                    <Button
                      style={styles.button}
                      title={choice}
                      onPress={() => {
                        handleClick([qIdx, cIdx]);
                      }}
                    />
                  </>
                );
              })}
            </>
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
