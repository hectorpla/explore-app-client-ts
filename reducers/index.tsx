import { StoreState } from "../types/";
import { AppAction } from "../actions";

export function reducer(
  state: StoreState = {}, // ! should not have intial state
  action: AppAction
): StoreState {
  return {
    ...state,
    activeArea: action.area
  };
}
