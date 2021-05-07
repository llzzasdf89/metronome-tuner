/**
 * Encapsulate all the functions related to the tap tempo feature
 */
const timeout  = 3000
let timesCache = []
let previousTimeRecorded = null
let difference = null
let timer =  null
function tap(){
    /**
     * Once user taped the button, begin timing, store it into a container called timesCache
     */
    const currentTime = Date.now()
    if(previousTimeRecorded){
        difference = currentTime - previousTimeRecorded
        timesCache.push(difference)
    }
    if (timesCache.length >= 2) { 
        /**
         * Once buffer has two more samples, calculate the average speed, convert it to bpmValue and notify the Vue component to
         * do rending job.
         *  */
        const bpm = Math.round(calculateBPM());
        return bpm
      }
    previousTimeRecorded = currentTime
    beginTimeout()
    return 0
}
function calculateBPM(){
        const average = timesCache.reduce((res,t)=> res+=t)/timesCache.length 
        const bpm = (1/(average/1000))* 60
        return bpm 
}
function beginTimeout(){
    clearTimeout(timer)
    timer = setTimeout(()=>{
    timesCache = []
    previousTimeRecorded = null 
    },timeout)
}
export {tap}