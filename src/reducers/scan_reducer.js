import { INFO_VEGY, EVAL_VEGY } from '../actions/types';

const INITIAL_STATE = { error: '', message: '', content: '',}

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case INFO_VEGY:
      return { ...state, content: action.payload, type : INFO_VEGY};
    case EVAL_VEGY:
        return { ...state, content: action.payload, type : EVAL_VEGY};
  }

  return state;
}