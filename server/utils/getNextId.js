const User = require('../models/User');
// =============================================================================
// // Helper function to get the next ID for a User
// =============================================================================
module.exports = async function getNextId() {
    const lastUser = await User.findOne().sort({ id: -1 });
    if (!lastUser) {
        return 1;
    }
    return lastUser.id + 1;
}