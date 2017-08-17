import { RANDOM_VEGIES } from '../actions/types';

const INITIAL_STATE = { error: '', message: '', content: '',}

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case RANDOM_VEGIES:
      return { ...state, content: action.payload, type : RANDOM_VEGIES};
  }

  return state;
}