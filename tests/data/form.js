export const USERS = [
  {
    scenario: 'Full form',
    name: 'Otavio',
    email: 'otavio@email.com',
    password: 'password123',
    country: 'mexico',
    gender: 'Male',
    genderValue: 'male',
    interests: [
        'Read books', 
        'Movies', 
        'Sports'
    ]
  },
  {
    scenario: 'Multiple Hobbies',
    name: 'Maria',
    email: 'maria@email.com',
    password: 'password456',
    country: 'brazil',
    gender: 'Female',
    genderValue: 'female',
    interests: [
        'Travel', 
        'Video Games'
    ]
  },
  {
    scenario: 'No Hobbies',
    name: 'Pedro',
    email: 'pedro@email.com',
    password: 'password456',
    country: 'United States of America',
    gender: 'Other',
    genderValue: 'other',
    interests: []
  },
  {
    scenario: 'Multiple Hobbies',
    name: 'Jose',
    email: 'jose@email.com',
    password: 'password456',
    country: 'portugal',
    gender: 'Other',
    genderValue: 'other',
    interests: [
        'Travel', 
        'Board Games'
    ]
  },
  {
    scenario: 'Only One Hobbies',
    name: 'Jose',
    email: 'jose@email.com',
    password: 'password456',
    country: 'canada',
    gender: 'Other',
    genderValue: 'other',
    interests: [
        'Travel'
    ]
  }
];

export const MESSAGES = {
  fail: [
    'The name field is required.', 
    'The email field is required.', 
    'The password field is required.', 
    'The country field is required.', 
    'The gender field is required.'
  ],
  success:  [
    'Success!', 
    'The form has been submitted successfully.'
  ]
};