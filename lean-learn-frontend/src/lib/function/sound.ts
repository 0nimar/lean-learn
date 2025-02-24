import selectSound from "../../assets/sound/sound1.aac";
import correctSound from "../../assets/sound/ans_sound.aac";
import incorrectSound from "../../assets/sound/WhatsApp Audio 2024-12-30 at 6.54.33 PM.aac";
import summarySound from "../../assets/sound/quiz-done.aac";
const correctAudio = () => {
  const audio = new Audio(correctSound);
  audio.play();
};
const incorrectAudio = () => {
  const audio = new Audio(incorrectSound);
  audio.play();
};
const summaryAudio = () => {
  const audio = new Audio(summarySound);
  audio.play();
};
const playCommonSound = () => {
  const audio = new Audio(selectSound);
  audio.play();
};
export { playCommonSound, correctAudio, incorrectAudio, summaryAudio };
