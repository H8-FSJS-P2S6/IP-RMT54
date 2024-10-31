import * as Tone from "tone";
import errorSfx from "../sounds/mixkit-wrong-answer-fail-notification-946.wav"
import navbarSfx from "../sounds/mixkit-gaming-lock-2848.wav";
import releaseSfx from "../sounds/sound-effects-pokemon-anime-7-pokemon-out.mp3"
import successSfx from "../sounds/mixkit-unlock-game-notification-253.wav";

export function sounds(src) {
    return new Tone.Player(src).toDestination();
}
export function loopSounds(src) {
  return new Tone.Player({
    url:src,
    loop: true,
  }).toDestination();
}



export const errorSound = sounds(errorSfx)
export const globalSound = sounds(navbarSfx);
export const releaseSound = sounds(releaseSfx);
export const successSound = sounds(successSfx);





