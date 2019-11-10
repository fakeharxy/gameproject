//const BACKEND_CONSTANTS = require('./server_constants')
const BACKEND_CONSTANTS = require('./server_constants');

const FRONTEND_CONSTANTS = {
    BOARD_WIDTH: 1500,
    BOARD_HEIGHT: 800
}

const CONSTANTS = Object.assign(BACKEND_CONSTANTS, FRONTEND_CONSTANTS);

module.exports = CONSTANTS;