interface MemberCompany {
  id: number;
  name: string;
}

export interface Member {
  id: number;
  email: string;
  name: string;
  company: MemberCompany;
}
