import { View } from "../models/view.mjs"


export const publicView=async(req,res)=>{
    try {
        const id=req.params.id
        const view=await View.findById({_id:id})
        res.json(view)
        // res.send("Inside Public")
    } catch (error) {
        res.json(error)
    }
}