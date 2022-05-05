
const User = require('../models/user');

const updateImg = async (model, id, path, nameFile) => {

    const user = await User.findById(id);

    if(!user){
        return false;
    }

    user.img = path;

    await User.findByIdAndUpdate(id, user);

}


module.exports = {
    updateImg
}
