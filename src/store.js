import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// Mock API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock survey data
const mockSurveys = [
  {
    id: 1,
    title: 'Customer Satisfaction Survey',
    description: 'Help us improve our services',
    status: 'active',
    responses: 156,
    completionRate: 78,
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Employee Engagement Survey',
    description: 'Annual employee feedback',
    status: 'active',
    responses: 89,
    completionRate: 92,
    createdAt: '2024-01-10'
  },
  {
    id: 3,
    title: 'Product Feedback Survey',
    description: 'Tell us about our new features',
    status: 'draft',
    responses: 23,
    completionRate: 45,
    createdAt: '2024-01-08'
  },
  {
    id: 4,
    title: 'Website Usability Survey',
    description: 'How easy is our website to use?',
    status: 'completed',
    responses: 234,
    completionRate: 85,
    createdAt: '2024-01-05'
  },
  {
    id: 5,
    title: 'Training Effectiveness Survey',
    description: 'Rate our training programs',
    status: 'active',
    responses: 67,
    completionRate: 71,
    createdAt: '2024-01-03'
  }
];

// Action Types
const FETCH_SURVEYS_REQUEST = 'FETCH_SURVEYS_REQUEST';
const FETCH_SURVEYS_SUCCESS = 'FETCH_SURVEYS_SUCCESS';
const FETCH_SURVEYS_FAILURE = 'FETCH_SURVEYS_FAILURE';
const SET_FILTER = 'SET_FILTER';
const SET_SEARCH = 'SET_SEARCH';

// Actions
export const fetchSurveysRequest = () => ({ type: FETCH_SURVEYS_REQUEST });
export const fetchSurveysSuccess = (surveys) => ({ type: FETCH_SURVEYS_SUCCESS, payload: surveys });
export const fetchSurveysFailure = (error) => ({ type: FETCH_SURVEYS_FAILURE, payload: error });
export const setFilter = (filter) => ({ type: SET_FILTER, payload: filter });
export const setSearch = (search) => ({ type: SET_SEARCH, payload: search });

export const fetchSurveys = () => async (dispatch, getState) => {
  dispatch(fetchSurveysRequest());

  try {
    await delay(Math.floor(Math.random() * 10_000));

    const { filters } = getState();
    let filteredSurveys = [...mockSurveys];

    if (filters.search) {
      filteredSurveys = filteredSurveys.filter(survey =>
        survey.title.includes(filters.search) ||
        survey.description.includes(filters.search)
      );
    }

    if (filters.status) {
      filteredSurveys = filteredSurveys.filter(survey => survey.status === filters.status);
    }

    dispatch(fetchSurveysSuccess(filteredSurveys));
  } catch (error) {
    dispatch(fetchSurveysFailure(error.message));
  }
};

// Reducers
const initialSurveysState = {
  items: [],
  loading: false,
  error: null
};

const surveysReducer = (state = initialSurveysState, action) => {
  switch (action.type) {
    case FETCH_SURVEYS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_SURVEYS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload
      };
    case FETCH_SURVEYS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

const initialFiltersState = {
  status: '',
  search: ''
};

const filtersReducer = (state = initialFiltersState, action) => {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        status: action.payload
      };
    case 'SET_SEARCH':
      return {
        ...state,
        search: action.payload
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  surveys: surveysReducer,
  filters: filtersReducer
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(thunk))
    : applyMiddleware(thunk)
);
