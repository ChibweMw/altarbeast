import cnf_dummy_group from "./cnf_dummy_group.js"
import cnf_hopperFish_group from "./cnf_hopperFish_group.js"

let wave_set_00 
export default wave_set_00 = [
    {
        enemy_type : cnf_dummy_group,

        delay: 2000,
        /**
         * The total number of times the Timer Event will repeat before finishing.
         */
        repeat: 10,
        /**
         * `true` if the Timer Event should repeat indefinitely.
         */
        loop: false,
        
        /**
         * The callback which will be called when the Timer Event fires.
         */
        // callback: wave.callback,
        // /**
        //  * The scope (`this` object) with which to invoke the `callback`.
        //  */
        // callbackScope: wave.callbackScope,
        
        // /**
        //  * Additional arguments to be passed to the `callback`.
        //  */
        // args: wave.args,
        /**
         * The scale of the elapsed time.
         */
        timeScale: 1,
        /**
         * The initial elapsed time in milliseconds. Useful if you want a long duration with repeat, but for the first loop to fire quickly.
         */
        startAt: 1000,
        /**
         * `true` if the Timer Event should be paused.
         */
        paused: false,
    },
    {
        enemy_type : cnf_hopperFish_group,
        
        delay: 4000,
        /**
         * The total number of times the Timer Event will repeat before finishing.
         */
        repeat: 5,
        /**
         * `true` if the Timer Event should repeat indefinitely.
         */
        loop: false,
        
        /**
         * The callback which will be called when the Timer Event fires.
         */
        // callback: wave.callback,
        // /**
        //  * The scope (`this` object) with which to invoke the `callback`.
        //  */
        // callbackScope: wave.callbackScope,
        
        // /**
        //  * Additional arguments to be passed to the `callback`.
        //  */
        // args: wave.args,
        /**
         * The scale of the elapsed time.
         */
        timeScale: 1,
        /**
         * The initial elapsed time in milliseconds. Useful if you want a long duration with repeat, but for the first loop to fire quickly.
         */
        startAt: 1500,
        /**
         * `true` if the Timer Event should be paused.
         */
        paused: false,
    }
]