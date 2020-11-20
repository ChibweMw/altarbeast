let cnf_waves_set_rounds
// export default cnf_waves_set_rounds = (delay, repeat, loop, callback, callbackScope, args, timeScale, startAt, paused) =>
export default cnf_waves_set_rounds = (wave) =>
{
    let wave_00
    wave_00 = {
        delay: wave.delay,
        /**
         * The total number of times the Timer Event will repeat before finishing.
         */
        repeat: wave.repeat,
        /**
         * `true` if the Timer Event should repeat indefinitely.
         */
        loop: wave.loop,
        
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
        timeScale: wave.timeScale,
        /**
         * The initial elapsed time in milliseconds. Useful if you want a long duration with repeat, but for the first loop to fire quickly.
         */
        startAt: wave.startAt,
        /**
         * `true` if the Timer Event should be paused.
         */
        paused: wave.paused,
    }
    return wave_00
}