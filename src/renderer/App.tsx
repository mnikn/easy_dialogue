import { Stack, Fab, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState, useCallback, useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sentence from './components/sentence';
import DialogueItem from './models/dialogue_item';
import DialogueSentence from './models/dialogue_sentence';

const Home = () => {
  const [dialogue, setDialogue] = useState<DialogueItem[]>([]);

  const addSentence = () => {
    const newSentence = new DialogueSentence();
    setDialogue((prev) => {
      return prev.concat(newSentence);
    });
  };

  const onDialogueItemChange = useCallback((data: DialogueItem, i: number) => {
    setDialogue((prev) => {
      const newDialogue = prev.map((item, j) => {
        if (j === i) {
          return data;
        }
        return item;
      });
      return newDialogue;
    });
  }, []);

  const onDialogueItemDelete = useCallback((i: number) => {
    setDialogue((prev) => {
      const newDialogue = prev.filter((item, j) => {
        return j !== i;
      });
      return newDialogue;
    });
  }, []);

  useEffect(() => {
    console.log(
      'd: ',
      dialogue.map((item) => item.toJson())
    );
  }, [dialogue]);
  return (
    <Container sx={{ padding: '20px', height: '100%' }}>
      <Stack spacing={2}>
        {dialogue.map((item, i) => {
          return (
            <Sentence
              key={item.id}
              index={i}
              initialData={item as DialogueSentence}
              onChange={onDialogueItemChange}
              onDelete={onDialogueItemDelete}
            />
          );
        })}
      </Stack>
      <Fab
        color="primary"
        aria-label="add"
        onClick={addSentence}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
        }}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
