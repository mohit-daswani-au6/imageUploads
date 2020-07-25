var Datauri=require("datauri")
var path=require("path")
var dataurichild=new Datauri()
module.exports=function(filename,buffer){
    var extension=path.extname(filename)
    return dataurichild.format(extension,buffer).content
}