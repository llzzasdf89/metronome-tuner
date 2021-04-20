import tunningObjs from '@/utils/constants/tuningObjs'
const noteBorder = []
let cacheArr = []
let diffArr = []
function filterPitch(pitch,clarity,isAuto){
    if(clarity < 0.95) return 0 
    if(pitch > 440 || pitch <= 40) return 0 //generally when plucking the open strings, the frequency will not exceed such interval 
        cacheArr.push(pitch)
        if(cacheArr.length< 5) return 0 //If the cache container does not have 5 value to be calculated, directly return
        cacheArr.sort()
        const valueTobeCompared = cacheArr[2] //After sort, get the median value to reduce the bias
        cacheArr.forEach((p)=>{
            const diff  = Math.abs(p - valueTobeCompared) //use the diffArr to record each cache's difference between median value
            diffArr.push(diff)
        })
        for(let i =0;i<diffArr.length;i++){
          if(diffArr[i] > 2) { //if any pitch's difference is more than 2, then it shows cached pitch has extreme bias, directly return 
             cacheArr = []
            diffArr = []
            return 0
            }
        }
        if(isAuto){
            const flag = noteBorder.some((border)=>valueTobeCompared>=border[0] && valueTobeCompared <= border[1])
            if(!flag) return 0
        }
        cacheArr = []
        diffArr = []
    return valueTobeCompared
}
function initateNoteBorder(){
    tunningObjs.forEach ((tuning)=>{
        const frequencies = tuning.frequencies
        frequencies.forEach((frequency)=>{
          noteBorder.push([frequency-10,frequency + 10])
        })
    })
}
initateNoteBorder()
export {filterPitch}