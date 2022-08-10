export const playAudio = (word) => {
  console.log('word', word)
  const audio = new Audio(`./assets/audio/${word}.mp3`);
  audio.load();
  audio.play();
};

