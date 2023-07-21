import questions from "../data/questions";

export const GetTriviaQuestions = (cityName) => {
  return questions[cityName];
};
