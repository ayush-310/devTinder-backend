const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User', // Creating Relationship : Reference to the User model
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User', // Creating Relationship : Reference to the User model
        required: true,
    },
    status: {
        type: String,
        enum: {
            values: ['ignored', 'interested', 'accepted', 'rejected'],
            message: `{VALUE} is not supported`
        },
        required: true,
    },
}, {
    timestamps: true,
});

/* The commented section `// Compound Index` is typically used to define compound indexes in a MongoDB
schema using Mongoose. Compound indexes are indexes that include multiple fields in the index key. */
// Compound Index
/* The line `connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });` is defining a compound
index in the Mongoose schema for the `ConnectionRequest` model. */
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

// Triggers before saving the connection request
connectionRequestSchema.pre("save",function(next){
    const connectionRequest = this;

    // Check if the fromUserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("You cannot send connection request to yourself");
    }
    next();
})

module.exports = mongoose.model('ConnectionRequest', connectionRequestSchema);
