import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router"
import users from './users'
import videos from './videos'

export const generateReducers = history =>
  combineReducers({
    router: connectRouter(history),
    users,
    videos
  });
