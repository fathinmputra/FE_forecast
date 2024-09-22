export interface EmployeeProperty {
  // pkid: number | null;

  email: string | null;
  fullname: string | null;
  gender: string | null;
  req_id: string | null;
  join_date: string | null;
  position_id: string | null;
}

export const employeeInitialState: EmployeeProperty = {
  email: null,
  fullname: null,
  gender: null,
  req_id: null,
  join_date: null,
  position_id: null,
};
