export const CHANGE_ACTIVE_AREA = "CHANGE_ACTIVE_AREA";
export type CHANGE_ACTIVE_AREA = typeof CHANGE_ACTIVE_AREA;

export interface ChangeActiveArea {
  type: CHANGE_ACTIVE_AREA;
  area: string;
}

export type AppAction = ChangeActiveArea;

export function changeActiveArea(area: string): ChangeActiveArea {
  return {
    type: CHANGE_ACTIVE_AREA,
    area
  };
}
