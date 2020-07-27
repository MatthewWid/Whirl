import Game from "./Game";

/**
 * Creates a new Whirl game instance, passing the arguments directly to the {@link Whirl.Game|game class's constructor}.
 *
 * @memberof Whirl
 * @function
 * @returns {Whirl.Game}
 */
const createGame = (...args) => new Game(...args);

export default createGame;
