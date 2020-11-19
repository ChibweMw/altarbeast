import PLAY_SCENE_INIT from "../states/game_play_init.js"
import PLAY_SCENE_INTRO from "../states/game_play_intro.js"
import PLAY_SCENE_PAUSE_WAVE from "../states/game_play_pause_wave.js"
import PLAY_SCENE_START_WAVE from "../states/game_play_start_wave.js"
import PLAY_SCENE_END_WAVE from "../states/game_play_end_wave.js"

let cnf_scene_play_states
export default cnf_scene_play_states =
{
    init: PLAY_SCENE_INIT,
    intro: PLAY_SCENE_INTRO,
    start: PLAY_SCENE_START_WAVE,
    pause: PLAY_SCENE_PAUSE_WAVE,
    end: PLAY_SCENE_END_WAVE

}