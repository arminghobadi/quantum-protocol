
export class ML{
  constructor(){
    this.linkSuccess = []
    this.linkSuccessRate = []
  }

  /**
   * linkSuccess = [ {linkName:ln, success:[0,0,0,1,1,1]}, {linkName:ln, success:[1,1,0,0,1]} ]
   * linkSuccessRate = [ {linkName:ln, success:0.4}, {linkName:ln, success: 0.5} ]
   */

  static getLinkSuccess(){
    return this.linkSuccess
  }

  static getLinkSuccessRate() {
    return this.linkSuccessRate
  }

  static addLinkScussecc({linkName, success}){
    linkSuccess.add({linkName, success: this.linkSuccess.success.add(success)})
  }
  
  static calculateLinkSuccessRate(){
    this.linkSuccess.forEach(ls /* LinkSuccess */ => {
      this.linkSuccessRate.add({ linkName: ls.linkName, success: ls.success.reduce((el, nextEl)=>{el+nextEl})/ls.success.length })
    })
  }

}