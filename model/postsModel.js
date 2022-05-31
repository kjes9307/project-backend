// 連接資料庫
const mongoose = require('mongoose');
    // 建立collection 
    const PostSchema = new mongoose.Schema( {
          user:{
            ref:"user",
            type: mongoose.Schema.ObjectId,
            required : [true,'user not exist']
          },
          tags: [
            {
              type: String,
              required: [true, '貼文標籤 tags 未填寫'],
              cast: false
            }
          ],
          type: {
            type: String,
            enum:['group','person'],
            required: [true, '貼文類型 type 未填寫'],
            cast: false
          },
          image: {
            type: String,
            default: "",
            cast: false
          },
          createAt: {
            type: Date,
            default: Date.now          
          },
          content: {
            type: String,
            required: [true, 'Content 未填寫'],
            cast: false
          },
          likes: [
            { 
              type: mongoose.Schema.ObjectId, 
              ref: 'User' 
            }
          ],
          comments:{
            type: Number,
            default: 0,
            cast: false
          }
    },{
        versionKey: false,
        collection : "post"
    }
    );
    // 預設加上"s"
    const Post = mongoose.model('Post', PostSchema);
    
    module.exports = Post;