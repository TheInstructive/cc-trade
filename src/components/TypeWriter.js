import React, { useState, useEffect } from "react";

const Typewriter = ({ words, descriptions }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [caretVisible, setCaretVisible] = useState(true);

  useEffect(() => {
    const typingDelay = 100;
    const deletingDelay = 50;
    const nextWordDelay = 4000;
    const currentWordLength = currentWord.length;

    if (isDeleting && currentWordLength === 0) {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev === words.length - 1 ? 0 : prev + 1));
    }

    if (!isDeleting && currentWordLength === words[currentWordIndex].length) {
      setTimeout(() => setIsDeleting(true), nextWordDelay);
    }

    setTimeout(
      () =>
        setCurrentWord((prev) =>
          isDeleting
            ? prev.slice(0, -1)
            : words[currentWordIndex].slice(0, prev.length + 1)
        ),
      isDeleting ? deletingDelay : typingDelay
    );
  }, [currentWord, currentWordIndex, isDeleting, words]);

  useEffect(() => {
    const caretInterval = setInterval(
      () => setCaretVisible((prev) => !prev),
      500
    );

    return () => clearInterval(caretInterval);
  }, []);

  return (
    <div>
      <span className="banner-title">{currentWord}</span>
      <span className="blink-caret" style={{ opacity: caretVisible ? 1 : 0 }}>|</span>
      <p>{descriptions[currentWordIndex]}</p>
    </div>
  );
};

export default Typewriter;
