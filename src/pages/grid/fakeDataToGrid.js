function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}

function generateFakeData() {
  let rows = [];
  let result = {};
  for (let i = 1; i <= 140; i++) {
    rows.push({
      id: i,
      task: 'Task ' + i,
      complete: Math.min(100, Math.round(Math.random() * 110)) + '%',
      priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
      issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
      startDate: getRandomDate(new Date(2015, 3, 1), new Date()),
      completeDate: getRandomDate(new Date(), new Date(2016, 0, 1)),
    });
  }

  result.titles = [
    {label: 'Id'},
    {label: 'Task'},
    {label: 'Complete'},
    {label: 'Priority'},
    {label: 'Issue Type'},
    {label: 'Start Date'},
    {label: 'Complete Date'},
  ];

  result.rows = rows;

  return result;
}

export { generateFakeData };
