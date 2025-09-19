import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSurveys, setFilter, setSearch } from './store';
import SurveyCard from './components/SurveyCard';
import Filters from './components/Filters';

function App() {
  const dispatch = useDispatch();
  const { items: surveys, loading, error } = useSelector(state => state.surveys);
  const { status, search } = useSelector(state => state.filters);

  useEffect(() => {
    dispatch(fetchSurveys());
  }, [dispatch]);

  useEffect(() => {
    if (status || search) {
      dispatch(fetchSurveys());
    }
  }, [status, search, dispatch]);

  const handleStatusChange = (newStatus) => {
    dispatch(setFilter(newStatus));
  };

  const handleSearchChange = (searchTerm) => {
    dispatch(setSearch(searchTerm));
  };

  const totalResponses = surveys.length > 0
    ? surveys.reduce((total, survey) => total + survey.responses, 0)
    : 0;

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading surveys...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Survey Dashboard</h1>
        <p>Manage and monitor your surveys</p>
      </div>

      <Filters
        status={status}
        search={search}
        onStatusChange={handleStatusChange}
        onSearchChange={handleSearchChange}
      />

      <div className="response-count">
        Total Surveys: {surveys.length} | Total Responses: {totalResponses}
      </div>

      <div className="survey-list">
        {surveys.map(survey => (
          <SurveyCard
            key={survey.id}
            survey={survey}
          />
        ))}
      </div>

      {surveys.length === 0 && !loading && (
        <div className="loading">No surveys found matching your criteria.</div>
      )}
    </div>
  );
}

export default App;
