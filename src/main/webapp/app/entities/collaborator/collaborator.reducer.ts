import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICollaborator, defaultValue } from 'app/shared/model/collaborator.model';

export const ACTION_TYPES = {
  FETCH_COLLABORATOR_LIST: 'collaborator/FETCH_COLLABORATOR_LIST',
  FETCH_COLLABORATOR: 'collaborator/FETCH_COLLABORATOR',
  CREATE_COLLABORATOR: 'collaborator/CREATE_COLLABORATOR',
  UPDATE_COLLABORATOR: 'collaborator/UPDATE_COLLABORATOR',
  DELETE_COLLABORATOR: 'collaborator/DELETE_COLLABORATOR',
  SET_BLOB: 'collaborator/SET_BLOB',
  RESET: 'collaborator/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type CollaboratorState = Readonly<typeof initialState>;

// Reducer

export default (state: CollaboratorState = initialState, action): CollaboratorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COLLABORATOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COLLABORATOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_COLLABORATOR):
    case REQUEST(ACTION_TYPES.UPDATE_COLLABORATOR):
    case REQUEST(ACTION_TYPES.DELETE_COLLABORATOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_COLLABORATOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COLLABORATOR):
    case FAILURE(ACTION_TYPES.CREATE_COLLABORATOR):
    case FAILURE(ACTION_TYPES.UPDATE_COLLABORATOR):
    case FAILURE(ACTION_TYPES.DELETE_COLLABORATOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_COLLABORATOR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_COLLABORATOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_COLLABORATOR):
    case SUCCESS(ACTION_TYPES.UPDATE_COLLABORATOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_COLLABORATOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/collaborators';

// Actions

export const getEntities: ICrudGetAllAction<ICollaborator> = (page, size, sort) => {
  const requestUrl = sort ? 
    sort.split(",")[0] === "login" || sort.split(',')[0] === "firstName" ? 
    `${apiUrl}${`?page=${page}&size=${size}&sort=account.${sort}`}`
    : `${apiUrl}${`?page=${page}&size=${size}&sort=${sort}`}`
  : `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_COLLABORATOR_LIST,
    payload: axios.get<ICollaborator>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntitiesBySkills = (page, size, sort, ArrayOfSkills) => {
  let flag = false;
  let requestUrl = `${apiUrl}/skills?`;
  for (let i = 0; i < ArrayOfSkills.length; i++){
    if(ArrayOfSkills[i] !== "" && !flag) {
      flag = true;
      requestUrl = requestUrl.concat(`skillId=${ArrayOfSkills[i]}`) 
    }else if (ArrayOfSkills[i] !== "" && flag) {
      requestUrl = requestUrl.concat(`&skillId=${ArrayOfSkills[i]}`) 
    }
  }
  return {
    type: ACTION_TYPES.FETCH_COLLABORATOR_LIST,
    payload: axios.get<ICollaborator>(`${requestUrl}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}&cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ICollaborator> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COLLABORATOR,
    payload: axios.get<ICollaborator>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICollaborator> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COLLABORATOR,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICollaborator> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COLLABORATOR,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICollaborator> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COLLABORATOR,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
