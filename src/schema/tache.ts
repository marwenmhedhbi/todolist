import  {TacheTC,tachesModel} from "../models/Taches";


const deleteTask  = TacheTC.addResolver({
  name: 'deleteTask',
  args: { _id:"String",userId:"String" },
  type: TacheTC,
  resolve: async ({ source, args }) => {
    const task:any = await tachesModel.findOneAndDelete({_id:args._id,userOwner:args.userId})
    if(task){
      return TacheTC
    }else{
      return  null;
    }
  },
});

const sharedTask  = TacheTC.addResolver({
  name: 'sharedTask',
  args: { _id:"String",userId:"String" },
  type: TacheTC,
  resolve: async ({ source, args }) => {
    const task:any = await tachesModel.findOne({_id:args._id})
    if(task){
      //task.shared.push(args.userId)
      const shared = []
      task.shared.map((item)=>shared.push(item))
      shared.push(args.userId)
      const taskResult ={
        shared:shared
      }
      const result = await tachesModel.updateOne({_id:args._id},taskResult)
      return task
    }else{
      return  null;
    }
  },
});

const commentTask  = TacheTC.addResolver({
  name: 'commentTask',
  args: { _id:"String",userId:"String",content:'String' },
  type: TacheTC,
  resolve: async ({ source, args }) => {
    const task:any = await tachesModel.findOne({_id:args._id})
    if(task){
      const comment = []
      task.comment.map((item)=>comment.push(item))
      comment.push({
        content:args.content,
        userId:args.userId
      })
      const taskResult ={
        comment:comment
      }
      const result = await tachesModel.updateOne({_id:args._id},taskResult)
      return task
    }else{
      return  null;
    }
  },
});

const getAllTask  = TacheTC.addResolver({
  name: 'getAllTask',
  args: { _id:"String" },
  type: [TacheTC],
  resolve: async ({ source, args }) => {
    const task:any = await tachesModel.find({$or: [ {userOwner:args._id }, { shared:{$in:[args._id]} } ]})
    return task
  },
});

const TacheQuery = {
  tacheById: TacheTC.getResolver("findById"),
  tacheByIds: TacheTC.getResolver("findByIds"),
  tacheOne: TacheTC.getResolver("findOne"),
  tacheConnection: TacheTC.getResolver("connection"),
  getAllTask:TacheTC.getResolver("getAllTask")
}

const TacheMutation = {
    tacheCreateOne: TacheTC.getResolver("createOne"),
    tacheCreateMany: TacheTC.getResolver("createMany"),
    tacheUpdateById: TacheTC.getResolver("updateById"),
    tacheUpdateOne: TacheTC.getResolver("updateOne"),
    tacheUpdateMany: TacheTC.getResolver("updateMany"),
    tacheRemoveById: TacheTC.getResolver("removeById"),
    tacheRemoveOne: TacheTC.getResolver("removeOne"),
    tacheRemoveMany: TacheTC.getResolver("removeMany"),
    deleteTask:TacheTC.getResolver("deleteTask"),
    updateSharedTask:TacheTC.getResolver("sharedTask"),
    updateCommentTask:TacheTC.getResolver("commentTask")

};

export { TacheQuery, TacheMutation };