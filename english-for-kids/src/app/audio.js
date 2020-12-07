export const playAudio = (word) => {
  const audio = new Audio(`./assets/audio/${word}.mp3`);
  audio.load();
  audio.play();
};

