function generateFakeData() {
  return {
    titles: [
      {label: 'Name'},
      {label: 'Email'},
      {label: 'Age'},
      {label: 'Type'},
      {label: 'City'},
      {label: 'Language'},
    ],
    rows: [
      {
        name: 'John Doe',
        email: 'john@doe.com',
        age: 39,
        type: 'Master',
        city: 'Campinas',
        language: 'Portuguese',
      },
      {
        name: 'Minnie Murray',
        email: 'minnie.murray31@example.com',
        age: 29,
        type: 'Master',
        city: 'São Paulo',
        language: 'Portuguese',
      },
      {
        name: 'Diane Ruiz',
        email: 'diane.ruiz91@example.com',
        age: 27,
        type: 'Senior',
        city: 'San Francisco',
        language: 'Spanish',
      },
      {
        name: 'Tonya Campbell',
        email: 'tonya.campbell@oci.com',
        age: 24,
        type: 'Leader',
        city: 'Orlando',
        language: 'English',
      },
      {
        name: 'Gina Ryan',
        email: 'gina.ryan@onesite.com.au',
        age: 27,
        type: 'Senior',
        city: 'Sidney',
        language: 'English',
      },
    ],
  };
}

export { generateFakeData };
