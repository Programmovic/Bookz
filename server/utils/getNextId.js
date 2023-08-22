const User = require('../models/User');
// =============================================================================
// // Helper function to get the next ID for a User
// =============================================================================
module.exports = async function getNextId() {
    const lastUser = await User.findOne().sort({ id: -1 });
    return lastUser ? lastUser.id + 1 : 1;
}