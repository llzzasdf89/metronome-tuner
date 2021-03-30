const tapTempo = {
    timeout : 2000,
    timesCache : [],
    previousTimeRecorded : null,
    difference : null,
    timer : null ,
    tap:function(){
    const currentTime = Date.now()
    if(this.previousTimeRecorded){
        this.difference = currentTime - this.previousTimeRecorded
        this.timesCache.push(this.difference)
    }
    this.previousTimeRecorded = currentTime
    this.beginTimeout()

},
    calculateBPM:function(){
        const average = this.timesCache.reduce((res,t)=> res+=t)/this.timesCache.length 
        const bpm = (1/(average/1000))* 60
        return bpm 
},
    beginTimeout:function(){
    clearTimeout(this.timer)
    this.timer = setTimeout(()=>{
        this.timesCache = []
        this.previousTimeRecorded = null 
    },this.timeout)
}
}
export default tapTempo