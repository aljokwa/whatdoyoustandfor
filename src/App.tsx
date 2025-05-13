import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import './App.css';

// Import questions and results
import { questions } from './data/questions';
import { getResult } from './utils/results';

// Background music
const backgroundMusic = new Howl({
  src: ['/assets/revolution.mp3'],
  loop: true,
  volume: 0.5,
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#d32f2f',
    },
    secondary: {
      main: '#ffd700',
    },
    background: {
      default: '#1a1a1a',
      paper: '#2d2d2d',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      color: '#ffd700',
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    },
    body1: {
      color: '#ffffff',
    },
  },
});

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    backgroundMusic.play();
    return () => backgroundMusic.stop();
  }, []);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const finalResult = getResult(newAnswers);
      setResult(finalResult);
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResult('');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(45deg, #1a1a1a 30%, #2d2d2d 90%)',
          py: 4,
        }}
      >
        <Container maxWidth="md">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    borderRadius: 2,
                    background: 'rgba(45, 45, 45, 0.9)',
                  }}
                >
                  <Typography variant="h4" gutterBottom>
                    Question {currentQuestion + 1} of {questions.length}
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    {questions[currentQuestion].text}
                  </Typography>
                  <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {questions[currentQuestion].options.map((option, index) => (
                      <Button
                        key={index}
                        variant="contained"
                        onClick={() => handleAnswer(index)}
                        sx={{
                          py: 2,
                          background: 'rgba(211, 47, 47, 0.8)',
                          '&:hover': {
                            background: 'rgba(211, 47, 47, 1)',
                          },
                        }}
                      >
                        {option}
                      </Button>
                    ))}
                  </Box>
                </Paper>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    borderRadius: 2,
                    background: 'rgba(45, 45, 45, 0.9)',
                  }}
                >
                  <Typography variant="h4" gutterBottom>
                    Your Revolutionary Ideology
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {result}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={resetQuiz}
                    sx={{
                      mt: 2,
                      background: '#ffd700',
                      color: '#000',
                      '&:hover': {
                        background: '#ffed4a',
                      },
                    }}
                  >
                    Take the Quiz Again
                  </Button>
                </Paper>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App; 