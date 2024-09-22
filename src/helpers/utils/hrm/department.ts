export interface DepartmentProperty {
  name: string | null;
  description: string | null;
}

export const departmentInitialState: DepartmentProperty = {
  name: null,
  description: null,
};
