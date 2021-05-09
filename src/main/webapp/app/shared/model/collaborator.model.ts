import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { ISkills } from 'app/shared/model/skills.model';
import { FamilySituation } from 'app/shared/model/enumerations/family-situation.model';

export interface ICollaborator {
  id?: number;
  registerNumber?: string;
  familySituation?: FamilySituation;
  phone?: string;
  dateOfBirth?: string;
  startDate?: string;
  avatarContentType?: string;
  avatar?: any;
  lineManager?: string;
  availabilityDate?: string;
  account?: IUser;
  skills?: ISkills[];
}

export const defaultValue: Readonly<ICollaborator> = {};
