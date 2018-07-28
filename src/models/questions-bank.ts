export interface IQuestion {
  id: string;
  text: string;
  author: string;
  answers: IAnswer[];
}

export interface IAnswer {
  id: string;
  author: string;
  text: string;
  upvotes: number;
  downvotes: number;
}

const questionBank: IQuestion[] = [
  {
    id: '9bbaa770-6bcc-4539-b19a-2fbb3f893d08',
    text: 'How many types of Hepatitis are there?',
    author: '24865076-fc92-4883-b29b-a6054de27b7b',
    answers: [
      {
        id: '6d005019-39f3-4b7d-8f62-d507738ed228',
        author: '109b7b5e-8b79-4d10-95e9-47296023eddd0',
        text:
          'There are seven types of Hepatitis, if you include the auto-immune hepatitis and alcohol hepatitis as separate things with Hepatitis A through E',
        upvotes: 10,
        downvotes: 0,
      },
    ],
  },
  {
    id: 'd614f4df-a116-46cd-98ad-3da84e8a9dff',
    text: 'Can HIV be transmitted by handshakes or pecks?',
    author: 'f19ea6cb-fc93-4299-a525-e0ca7de5d216',
    answers: [
      {
        id: '6b2d0a6a-b7fd-4ff0-abd3-ec7144226a13',
        author: '109b7b5e-8b79-4d10-95e9-47296023eddd0',
        text: 'No.',
        upvotes: 1,
        downvotes: 5,
      },
    ],
  },
];

export default questionBank;
