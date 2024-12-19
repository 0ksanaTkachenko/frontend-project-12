export const renderContent = (status, content, errMessage) => {
  const statuses = {
    loading: <div>Loading...</div>,
    failed: <div style={{ color: 'red' }}>{errMessage}</div>,
    idle: content,
  };
  
  return statuses[status];
};
  