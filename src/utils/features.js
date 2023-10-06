import { json } from "express";


export class Features{
    constructor(mongooseQuery,queryString){
        this.mongooseQuery=mongooseQuery;
        this.queryString=queryString
    }

    ////1_pagination==========
    paginate(){
        let page=this.queryString.page *1 || 1
        if(this.queryString.page<=0) page=1
        let skip=(page-1)*5
        this.page=page
        this.mongooseQuery.skip(skip).limit(5)
        return this
    }
    ////2_filteeeeeeer===========
    filter(){
    let filterobj={...this.queryString}
    let excutedQuery=[`page`,`sort`,`fields`,`keyword`]
    excutedQuery.forEach((q)=>{
        delete filterobj[q]
    })
    filterobj=JSON.stringify(filterobj)
    filterobj=filterobj.replace(/\b(gt|gte|lt|lte)\b/g,match=>`$${match}`)
    filterobj=JSON.parse(filterobj)
    this.mongooseQuery.find(filterobj)
    return this
}
// sort
sort(){
    if(this.queryString.sort){
        let sortedBy=this.queryString.sort.split(',').join(' ')
        this.mongooseQuery.sort(sortedBy)
    }
    return this
}
/// serach=============
search(){
    if(this.queryString.keyword){
        this.mongooseQuery.find(
            {
                $or:
            [
                {title:{regex:this.queryString.keyword,$options:'i'}},
                {description:{$regex:this.queryString.keyword,$options:'i'}}
            ]
            }
        )
    }
    return this
}
/// selected fields
fields(){
    if(this.queryString.fields){
     let fields=this.queryString.fields.split(',').join(' ')
     console.log(fields)
     this.mongooseQuery.select(fields)
    }
    return this
}


}