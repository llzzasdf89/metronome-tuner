/**
 * Encapsulate all the relevant function of scheduling notes
 */
const lookahead = 25 //how soon a set Interval function to call scheduler
const scheduleAheadTime = 0.1 //how long should our scheduler plan the next note ahead
let bpm = -1
let hitTime = 1
let nextNoteTime = 0 //used to record how long a note should be playing, such things would be done in scheduler function
let audioCtx = null //used to store audioContext object
let SubdivisionNote = null
let intervalID = null
let upperNumeral = 4
let lowerNumeral = 4
let currentBeat = 0 //Once the player is working, we should notice which beat it is currently in
let notifyVueOfBeatChange = null
function setLowerNum(lowerNum){
    lowerNumeral = lowerNum
}
function setUpperNum(upperNum){
    upperNumeral = upperNum
}
function setBpmValue(BpmValue){
    bpm = BpmValue
}
function setSubdivisionNote(note){
    SubdivisionNote = note
}
function scheduler() {
    while (
      nextNoteTime <
      audioCtx.currentTime + scheduleAheadTime
    ) {
      scheduleNote(nextNoteTime);
      nextNote();
      const beatChangeIndexObj = countBeat()
      notifyVueOfBeatChange(beatChangeIndexObj) //notify view layer to update views.
    }
  }
function nextNote() {
    /**According to the bpm value calculate the next moment which note should be played */
    const secondsPerBeat = 60.0 / bpm;
    nextNoteTime += secondsPerBeat * getSubdivisionHitTime();
  }
  function getSubdivisionHitTime() {
    //According to the time signature, calculate the next Note time
    //CorrespondingNum is equal to 1/note, for example a quarter note value is 1/4
    const { correspondingNum } =  SubdivisionNote;
    return correspondingNum * lowerNumeral;
    //Lower Numeral is used to tell what note should take a beat. Like 4/4 then a quarter note corresponds to a beat
  }
function scheduleNote (time) {
    /**Call the audioContext Oscillator to create sound */
    const osc = audioCtx.createOscillator();
    const envelope = audioCtx.createGain();
    envelope.gain.value = 1;
    envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
    envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);
    /**
     * Subdivision Hit time is equal to lowerNum * noteCorrespondingNum
     * For example, in time signature 4/4, a quarter's subdivision time is 4 * 1/4 = 1, because a quarter will correspond to one beat under 4/4
     * However, if the subdivision is eighth note, then it shows that each eighth note will take half subdivision beat of one beat.
     * Our hitTime will be accmulated from 0 to 1 to record which subdivision beat it is in
     * If its value is 1, then it shows our subdivision beat is done, go to next beat of current bar.
     */
    const SubdivisionHitTime = getSubdivisionHitTime();
    osc.frequency.value = hitTime === 0 ? 440 : 1000; //stress the first division beat
    hitTime += SubdivisionHitTime;
    if (hitTime > 1) hitTime = 0;
    //in case user switches from small notes to large notes, for example 8th -> 4th
    osc.connect(envelope);
    envelope.connect(audioCtx.destination);
    osc.start(time);
    osc.stop(time + 0.03);
  }
function initateScheduler(Vuecomponent){
    /** Get relevant value needed from Vue component */
    const {controlCircle,currentSubdivisionNote,bpmValue,lowerNumeral,upperNumeral} = Vuecomponent
    notifyVueOfBeatChange = controlCircle
    setSubdivisionNote(currentSubdivisionNote)
    setBpmValue(bpmValue)
    setUpperNum(lowerNumeral)
    setLowerNum(upperNumeral)
}

function countBeat () {
    //this function is used to count which beat the metronome should be playing
    /**
     * Notice: The meaning of 'currentBeat' is used to tell user which beat he is currently in.
     * On the other hand, this variable is corresponding to the index of circleObj, which is starting from 0 instead of 1.
     * For example, in the user interface, the first circle will turn black if currentBeat values 0.
     */

    /**'upperNumeral' means how many beats per bar */
    let res = {
        CircleindextobeClosed:-1,
        CircleindextobeActived:-1
    } //record the circle indexs to be closed and actived. 
    if (hitTime !== 1) return res; //if there is division, its value should be 1 so that the metronome would go to next beat. If not, the division value should always be 1.
    if (upperNumeral === 1) {
        res.CircleindextobeActived = 0
        return res //if there is only one beat in a bar, we need to control only 1 circle displaying, directly return;
    } 
    if (currentBeat === 0) {
      res.CircleindextobeClosed = upperNumeral - 1,
      res.CircleindextobeActived = currentBeat
      ++currentBeat
      //if currentBeat is 0, then its previous beat should be upperNumeral - 1. switch it off.
    } else if (currentBeat >= upperNumeral - 1) {
        res.CircleindextobeClosed = currentBeat - 1,
        res.CircleindextobeActived = currentBeat
        currentBeat = 0;
      //if currentBeat is approaching upper boundary of array, set it to the first beat, which is 0
    } else {
      res.CircleindextobeClosed = currentBeat-1
      res.CircleindextobeActived = currentBeat
      ++currentBeat;
      //if currentBeat is not approaching boundary, then we directly + 1
    }
    hitTime = 0; //each time we count a beat, reset the subdivision value to 0
    return res
  }
  function stopScheduler() {
    clearInterval(intervalID);
    intervalID = null;
    currentBeat = 0;
    nextNoteTime = 0;
    if(audioCtx) {
      audioCtx.close();
      audioCtx = null;
      }
  }
  function beginScheduler(){
    /** initate audioContext  */
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      audioCtx = new AudioContext()
      }
    currentBeat = 0; // each time playing begins, count the beat from the first beat, but remember the first beat is 0, which is convinent as index for circleObj
    intervalID = setInterval(() => scheduler(), lookahead);
  }
  export {initateScheduler,stopScheduler,beginScheduler,setUpperNum,setLowerNum,setBpmValue,setSubdivisionNote}