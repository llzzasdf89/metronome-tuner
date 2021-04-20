/**
 * Encapsulate all the functions related to the Compare function under auto Mode
 */
function autoCompare(pitchFrequency,currentTuning) {
    const tuningFrequencies = currentTuning.frequencies;
    const mostMatchingIndex = findMostMatchingIndex(tuningFrequencies,pitchFrequency);
    if (mostMatchingIndex < 0) return;
    const mostMatchingNoteFrequency = tuningFrequencies[mostMatchingIndex];
    const centsOffset = getCentsOffset(pitchFrequency,mostMatchingNoteFrequency)

    return {
        centsOffset,
        mostMatchingIndex
    }
  }
  function findMostMatchingIndex(tuningFrequencyArr, pitchFrequency) {
    /**
     * According to the frequency detected, calculate the difference between expected tuning frequency and the current frequency
     * Then pick the one with smallest difference, return the index
     */
    let difference = -1000;
    let index = -1;
    //if the frequency is lower than the 6th string frequency of currentTuning or higher than the first string, directly return
    if(pitchFrequency <= tuningFrequencyArr[0]) return index = 0
    else if (pitchFrequency >= tuningFrequencyArr[5]) return index = 5
    for(let i=0;i<tuningFrequencyArr.length;i++){
      const diff = Math.abs(pitchFrequency - tuningFrequencyArr[i]);
      if (diff < Math.abs(difference)) {
        difference = diff;
        index = i
    }
    }
    return index;
  }
  function getCentsOffset(pitchFrequency,FrequencyTobeCompared){
    return Math.round(1200 * Math.log2(pitchFrequency / FrequencyTobeCompared))
  }
  export {autoCompare}