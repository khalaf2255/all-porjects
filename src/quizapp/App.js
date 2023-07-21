import { useEffect } from "react";
import { useState } from "react";

const quiez = [
  {
    id: 1,
    question: "How Are You?",
    answers: [
      {
        id: 1,
        ans: "Fine",
        status: true,
      },
      {
        id: 2,
        ans: "Bad",
        status: false,
        selected: false,
      },
      {
        id: 3,
        ans: "Not Me",
        status: false,
        selected: false,
      },
      {
        id: 4,
        ans: "Adel",
        status: false,
        selected: false,
      },
    ],
  },
  {
    id: 2,
    question: "Where alex live?",
    answers: [
      {
        id: 1,
        ans: "Qatar",
        status: false,
        selected: false,
      },
      {
        id: 2,
        ans: "London",
        status: false,
        selected: false,
      },
      {
        id: 3,
        ans: "Egypt",
        status: true,
        selected: false,
      },
      {
        id: 4,
        ans: "India",
        status: false,
        selected: false,
      },
    ],
  },
  {
    id: 3,
    question: "What is my name?",
    answers: [
      {
        id: 1,
        ans: "Mido",
        status: false,
        selected: false,
      },
      {
        id: 2,
        ans: "Aamn",
        status: false,
        selected: false,
      },
      {
        id: 3,
        ans: "Kamel",
        status: false,
        selected: false,
      },
      {
        id: 4,
        ans: "Ahmed",
        status: true,
        selected: false,
      },
    ],
  },
];

export default function App() {
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [disabledClick, setDsabledClick] = useState(false);
  const [selectedAns, setSelectedAns] = useState(false);
  const [score, setScore] = useState(0);
  const [slider, setSlider] = useState(0);
  const [selectedElement, setSelectedElement] = useState("");
  const [correct, setCorrect] = useState(false);

  function choseAnswer(answer) {
    setCheckAnswer(answer.status);
    setCorrect(false);

    setDsabledClick((disabledClick) => (disabledClick = true));

    for (let i = 0; i < quiez.length; i++) {
      const answers = quiez[i];
      for (let x = 0; x < answers.answers.length; x++) {
        const ans = answers.answers[x];

        if (ans.id === answer.id) {
          setSelectedAns((answer.selected = true));
        } else {
          setSelectedAns((ans.selected = false));
        }
      }
    }
    setSelectedElement(answer);
  }

  useEffect(() => {
    function checkS() {
      if (checkAnswer) {  
          setScore(score + 1);  
        setCheckAnswer(false);
      } 
    }
    checkS();
    return function() {
        setCorrect(true);
    }
  }, [checkAnswer, correct, score, selectedAns, selectedElement]);
  function next() {
    setSlider(slider + 1);
  }
  function previous() {
    setSlider(slider - 1);
  }
  return (
    <div className={`quiezApp`}>
      <div className="quizDetails">
        <p>
          {" "}
          question ( {slider + 1} of {quiez.length} )
        </p>
        <p>quiz score ( {score} )</p>
      </div>
      <h2 className="question">
        {quiez[slider].id}- {quiez[slider].question}
      </h2>
      <div className={`answers `}>
        {quiez[slider].answers.map((ans, index) => (
          <p
            className={`${ans.selected ? " active" : ""}`}
            key={ans.id}
            onClick={() => choseAnswer(ans)}
          >
            {index + 1}- {ans.ans}
          </p>
        ))}
      </div>
      <Slider slider={slider} next={next} previous={previous} />
    </div>
  );
}

function Slider({ next, previous, slider }) {
  return (
    <div className="slider">
      <button
        onClick={previous}
        className={`btn__slider ${slider <= 0 ? "prevent" : ""}`}
      >
        Previos{" "}
      </button>
      <button
        onClick={next}
        className={`btn__slider ${
          slider === quiez.length - 1 ? "prevent" : ""
        }`}
      >
        Next{" "}
      </button>
    </div>
  );
}
