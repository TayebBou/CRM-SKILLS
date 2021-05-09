import { ICollaborator } from 'app/shared/model/collaborator.model';
import { ICategory } from 'app/shared/model/category.model';

export interface ISkills {
  id?: number;
  label?: string;
  code?: string;
  collaborators?: ICollaborator[];
  category?: ICategory;
}

export const defaultValue: Readonly<ISkills> = {};
