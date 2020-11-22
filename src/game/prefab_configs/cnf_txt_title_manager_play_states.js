import TXT_TITLE_INIT from "../states/txt_title_init.js"
import TXT_WAVE_END_IN from "../states/txt_wave_end_in.js"
import TXT_WAVE_END_OUT from "../states/txt_wave_end_out.js"
import TXT_WAVE_PRE_ROUND from "../states/txt_wave_pre_round.js"
import TXT_WAVE_TITLE_IN from "../states/txt_wave_title_in.js"
import TXT_WAVE_TITLE_OUT from "../states/txt_wave_title_out.js"

let cnf_txt_title_manager_play_states
export default cnf_txt_title_manager_play_states =
{
    init: TXT_TITLE_INIT,
    wave_title_in: TXT_WAVE_TITLE_IN,
    wave_title_out:TXT_WAVE_TITLE_OUT,
    wave_end_in: TXT_WAVE_END_IN,
    wave_end_out: TXT_WAVE_END_OUT,
    wave_pre_round: TXT_WAVE_PRE_ROUND
}