export interface RecruitmentRequestProperty {
  position_id: number | null;
  description: string | null;
  needed_number: number | null;
  status: string | null;
}

export const recruitmentRequestInitialState: RecruitmentRequestProperty = {
  position_id: 0,
  description: null,
  needed_number: 0,
  status: null,
};
