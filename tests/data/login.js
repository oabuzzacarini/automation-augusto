export const USERS = {
  valid: {
    username: 'test',
    password: 'password123',
    expect: 'User successfully logged in!',
    expect_logout: 'You have been logged out.'
  },
  invalid_pass: {
    username: 'test',
    password: 'password1234!',
    expect: 'Incorrect username or password!',
    expect_block: 'User temporarily blocked!' 
  },
   invalid_user: {
    username: 'test1',
    password: 'password1234!',
    expect: 'User not found!'
  },
  blocked: {
    username: 'testblock',
    password: 'password123',
    expect: 'User blocked!'
  }
};