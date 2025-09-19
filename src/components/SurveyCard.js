import { useState } from 'react';

const SurveyCard = ({ survey }) => {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    console.log('Survey clicked:', survey.id);
    // In real app, this would navigate to survey details
  };

  const getStatusColor = () => {
    switch (survey.status) {
      case 'active':
        return '#10b981';
      case 'draft':
        return '#f59e0b';
      case 'completed':
        return '#6b7280';
      default:
        return '#ef4444';
    }
  };

  const statusColor = getStatusColor();

  return (
    <div
      className="survey-card"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        boxShadow: hovered ? '0 8px 16px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <div className="survey-title">{survey.title}</div>
      <div className="survey-meta">
        <span
          style={{
            color: statusColor,
            fontWeight: 'bold',
            textTransform: 'capitalize',
          }}
        >
          {survey.status}
        </span>
        {' • '}
        Created: {survey.createdAt}
      </div>
      <div className="survey-stats">
        <div className="stat-item">
          <span className="stat-value">{survey.responses}</span>
          <span className="stat-label">Responses</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{survey.completionRate}%</span>
          <span className="stat-label">Completion</span>
        </div>
      </div>
    </div>
  );
};

export default SurveyCard;
