
export class ML{
  constructor(){
    this.linkSuccess = []
    this.linkSuccessRate = []
  }

  /**
   * linkSuccess = [ {linkName:ln, success:[0,0,0,1,1,1]}, {linkName:ln, success:[1,1,0,0,1]} ]
   * linkSuccessRate = [ {linkName:ln, success:0.5}, {linkName:ln, success: 0.6} ]
   */

  getLinkSuccess(){
    return this.linkSuccess
  }

  getLinkSuccessRate() {
    return this.linkSuccessRate
  }

  pushLinkSuccess({linkName, success}){
    if (!this.linkSuccess.find((el)=>el.linkName === linkName)){
      this.linkSuccess.push({linkName, success: []})
    }
    this.linkSuccess.find((el)=> el.linkName === linkName ).success.push(success)
    //this.linkSuccess.push({linkName, success: this.linkSuccess.success.push(success)})
    console.log(this.linkSuccess.length)
    this.calculateLinkSuccessRate()
  }
  
  calculateLinkSuccessRate(){
    this.linkSuccessRate = []
    this.linkSuccess.forEach(ls /* LinkSuccess */ => {
      this.linkSuccessRate.push({ linkName: ls.linkName, success: (ls.success.reduce((sum, next) => sum + next)) / ls.success.length })
    })
    console.log(this.linkSuccessRate)
  }

}