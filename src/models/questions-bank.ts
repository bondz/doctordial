export interface IQuestion {
  id: string;
  text: string;
  author: number;
  answers: IAnswer[];
}

export interface IAnswer {
  author: number;
  text: string;
  upvotes: number;
  downvotes: number;
}

const questionBank: IQuestion[] = [
  {
    id: 'question-1',
    text: 'How many types of Hepatitis are there?',
    author: 2,
    answers: [
      {
        author: 1,
        text:
          'There are seven types of Hepatitis, if you include the auto-immune hepatitis and alcohol hepatitis as separate things with Hepatitis A through E',
        upvotes: 10,
        downvotes: 0,
      },
    ],
  },
  {
    id: 'question-2',
    text: 'Can HIV be transmitted by handshakes or pecks?',
    author: 3,
    answers: [
      {
        author: 1,
        text: 'No.',
        upvotes: 1,
        downvotes: 5,
      },
    ],
  },
];

export default questionBank;
