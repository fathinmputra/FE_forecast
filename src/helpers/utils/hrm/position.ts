export interface PositionProperty {
  name: string | null;
  department_id: string | null;
  Department: {
    name: string | null;
  };
  type: string | null;
  description: string | null;
}

export const positionInitialState: PositionProperty = {
  name: null,
  department_id: null,
  Department: {
    name: null,
  },
  type: null,
  description: null,
};
