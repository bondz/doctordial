# Usage.

When the server is up and running, visit http://localhost:3005 and signin using the email or password
of one of the users in [models/users](../src/models/user.ts) or create a new user by signing up with the form

## Find all users

```graphql
{
  users {
    id
    firstName
    lastName
  }
}
```

## Get all questions

```graphql
{
  questions {
    id
    text
    author {
      firstName
      lastName
    }
    answers {
      text
      author {
        firstName
        lastName
      }
    }
  }
}
```

## Create a new question

```graphql
mutation {
  createQuestion(text: "What diseases can mosquito bites cause?") {
    id
    text
  }
}
```

## Answer a question

```graphql
mutation {
  answerQuestion(
    questionID: "d614f4df-a116-46cd-98ad-3da84e8a9dff"
    text: "No. Human Immuno-deficiency virus cannot survive outside the body"
  ) {
    id
    text
    answers {
      text
      author {
        firstName
        lastName
      }
    }
  }
}
```

Refer to the graphql documentation in the sidebar to see what other requests can be made
