This backend service is designed to manage a daily expenses sharing application. Users can add expenses and split them using three different methods: equal amounts, exact amounts, and percentages. The application also manages user details, validates inputs, and generates downloadable balance sheets.

# Features

1.User Management without passwords (using mobile number, email, and name).</br>
2.Add and manage expenses.</br>
3.Split expenses equally, by exact amounts, or by percentages.</br>
4.Retrieve individual and overall expenses.</br>
5.Generate and download balance sheets.</br>

# Setup
Clone the Repository:


```git clone https://github.com/your-username/daily-expenses-sharing-app.git```</br>
```cd daily-expenses-sharing-app```


# Install Dependencies:

```
npm install
```

# Run the Application:

```
npm start
```


# API Endpoints

## User Endpoints

**Create User:**

**Endpoint:** POST /api/users

**Body:**

```
{
  "name": "Arya",
  "email": "arya@example.com",
  "mobile": "1234567890"
}
```

**Response**

```{
    "message": "User created successfully",
    "user": {
        "id": "66a68add6f888f0dd3b66034",
        "email": "arya@example.com",
        "name": "Arya",
        "mobile": "1234567890"
    }
}
```


![image](https://github.com/user-attachments/assets/d37d00b5-630f-4870-a2b3-6c67911aad71)


**Retrieve User Details:**

Endpoint: GET /api/users/:name

![image](https://github.com/user-attachments/assets/1528e429-1d34-4c48-aa13-8a2c6d06c40f)


## Expense Endpoints

**Add Expense:**

Endpoint: POST /api/expenses

1. Equal

Body:

```{
  "description": "Dinner",
  "amount": 3000,
  "paidBy": {
    "name": "Trisha",
    "email": "trisha@example.com",
    "mobile": "1234567890"
  },
  "participants": [
    {
      "name": "Helen",
      "email": "helen@example.com",
      "mobile": "0987654321"
    },
    {
      "name": "Mesha",
      "email": "mesha@example.com",
      "mobile": "1112223333"
    },
    {
      "name": "Karthik",
      "email": "karthik@example.com",
      "mobile": "4445556666"
    }
  ],
  "splitType": "equal"
}
```

Response:

```{
    "_id": "66a68bff6f888f0dd3b66043",
    "description": "Dinner",
    "amount": 3000,
    "paidBy": {
        "_id": "66a68bff6f888f0dd3b66038",
        "email": "trisha@example.com",
        "name": "Trisha"
    },
    "participants": [
        {
            "userId": {
                "_id": "66a68bff6f888f0dd3b6603d",
                "email": "helen@example.com",
                "name": "Helen"
            },
            "amount": 1000,
            "_id": "66a68bff6f888f0dd3b66044"
        },
        {
            "userId": {
                "_id": "66a68bff6f888f0dd3b6603f",
                "email": "mesha@example.com",
                "name": "Mesha"
            },
            "amount": 1000,
            "_id": "66a68bff6f888f0dd3b66045"
        },
        {
            "userId": {
                "_id": "66a68bff6f888f0dd3b66041",
                "email": "karthik@example.com",
                "name": "Karthik"
            },
            "amount": 1000,
            "_id": "66a68bff6f888f0dd3b66046"
        }
    ],
    "splitType": "equal",
    "createdAt": "2024-07-28T18:20:47.575Z",
    "updatedAt": "2024-07-28T18:20:47.575Z",
    "__v": 0
}
```

![image](https://github.com/user-attachments/assets/ef3dc7f5-3d05-4ddd-b015-a7671e502b08)

2. Exact
   
Body:

```{
  "description": "Shopping",
  "amount": 4299,
  "paidBy": {
    "name": "abhishek",
    "email": "abhishek@example.com",
    "mobile": "1234567890"
  },
  "participants": [
    {
      "name": "amisha",
      "email": "amisha@example.com",
      "mobile": "0987654321",
      "amount": 799
    },
    {
      "name": "charu",
      "email": "charu@example.com",
      "mobile": "1112223333",
      "amount": 2000
    },
    {
      "name": "ansh",
      "email": "ansh@example.com",
      "mobile": "1234567890",
      "amount": 1500
    }
  ],
  "splitType": "exact"
}
```

Response:

```{
    "_id": "66a68c856f888f0dd3b6605a",
    "description": "Shopping",
    "amount": 4299,
    "paidBy": {
        "_id": "66a68c856f888f0dd3b6604f",
        "email": "abhishek@example.com",
        "name": "abhishek"
    },
    "participants": [
        {
            "userId": {
                "_id": "66a68c856f888f0dd3b66054",
                "email": "amisha@example.com",
                "name": "amisha"
            },
            "amount": 799,
            "_id": "66a68c856f888f0dd3b6605b"
        },
        {
            "userId": {
                "_id": "66a68c856f888f0dd3b66056",
                "email": "charu@example.com",
                "name": "charu"
            },
            "amount": 2000,
            "_id": "66a68c856f888f0dd3b6605c"
        },
        {
            "userId": {
                "_id": "66a68c856f888f0dd3b66058",
                "email": "ansh@example.com",
                "name": "ansh"
            },
            "amount": 1500,
            "_id": "66a68c856f888f0dd3b6605d"
        }
    ],
    "splitType": "exact",
    "createdAt": "2024-07-28T18:23:01.182Z",
    "updatedAt": "2024-07-28T18:23:01.182Z",
    "__v": 0
}
```


   ![image](https://github.com/user-attachments/assets/6ef0f2ad-5fcb-40ca-bfe2-066fea2ebaa7)

3. Percentage

Body:

```{
  "description": "Party",
  "amount": 1000,
  "paidBy": {
    "name": "Misha",
    "email": "misha@example.com",
    "mobile": "1234567890"
  },
  "participants": [
    {
      "name": "Misha",
      "email": "misha@example.com",
      "mobile": "1234567890",
      "amount": 50
    },
    {
      "name": "Madhav",
      "email": "madhav@example.com",
      "mobile": "0987654321",
      "amount": 25
    },
    {
      "name": "Rupali",
      "email": "rupali@example.com",
      "mobile": "1112223333",
      "amount": 25
    }
  ],
  "splitType": "percentage"
}
```

Response:

```{
    "_id": "66a68cf56f888f0dd3b6606f",
    "description": "Party",
    "amount": 1000,
    "paidBy": {
        "_id": "66a68cf56f888f0dd3b66066",
        "email": "misha@example.com",
        "name": "Misha"
    },
    "participants": [
        {
            "userId": {
                "_id": "66a68cf56f888f0dd3b66066",
                "email": "misha@example.com",
                "name": "Misha"
            },
            "amount": 500,
            "_id": "66a68cf56f888f0dd3b66070"
        },
        {
            "userId": {
                "_id": "66a68cf56f888f0dd3b6606d",
                "email": "madhav@example.com",
                "name": "Madhav"
            },
            "amount": 250,
            "_id": "66a68cf56f888f0dd3b66071"
        },
        {
            "userId": {
                "_id": "66a68cf56f888f0dd3b6606b",
                "email": "rupali@example.com",
                "name": "Rupali"
            },
            "amount": 250,
            "_id": "66a68cf56f888f0dd3b66072"
        }
    ],
    "splitType": "percentage",
    "createdAt": "2024-07-28T18:24:53.910Z",
    "updatedAt": "2024-07-28T18:24:53.910Z",
    "__v": 0
}
```

![image](https://github.com/user-attachments/assets/405d3c06-719e-40af-8cfa-2df78a2d0933)

**Retrieve individual user expenses**

**Endpoint:** GET /api/expenses/user/:name

**Response:**

```[
    {
        "description": "Party",
        "totalAmount": 1000,
        "paidBy": {
            "name": "Misha",
            "email": "misha@example.com"
        },
        "userShare": {
            "name": "Rupali",
            "email": "rupali@example.com",
            "amount": 250
        },
        "splitType": "percentage",
        "createdAt": "2024-07-28T18:24:53.910Z",
        "updatedAt": "2024-07-28T18:24:53.910Z"
    }
]
```

![image](https://github.com/user-attachments/assets/d46f97d7-7206-4ed6-a4de-d3a4508fee6b)


**Retrieve Overall Expenses**

**Endpoint:** GET /api/expenses/all

**Response**

```[
    {
        "_id": "66a63f3bd5842b25dc33744d",
        "description": "Party",
        "amount": 1000,
        "paidBy": {
            "name": "Manisha",
            "email": "manisha@example.com"
        },
        "participants": [
            {
                "name": "Manisha",
                "email": "manisha@example.com",
                "amount": 500
            },
            {
                "name": "Pragya",
                "email": "pragya@example.com",
                "amount": 250
            },
            {
                "name": "Esha",
                "email": "esha@example.com",
                "amount": 250
            }
        ],
        "splitType": "percentage",
        "createdAt": "2024-07-28T12:53:15.916Z",
        "updatedAt": "2024-07-28T12:53:15.916Z"
    },
    {
        "_id": "66a67d83d5842b25dc3374ef",
        "description": "Dinner",
        "amount": 3000,
        "paidBy": {
            "name": "Roshini",
            "email": "roshini@example.com"
        },
        "participants": [
            {
                "name": "Poojs",
                "email": "pooja@example.com",
                "amount": 1000
            },
            {
                "name": "Ruhi",
                "email": "ruhi@example.com",
                "amount": 1000
            },
            {
                "name": "Asha",
                "email": "asha@example.com",
                "amount": 1000
            }
        ],
        "splitType": "equal",
        "createdAt": "2024-07-28T17:18:59.549Z",
        "updatedAt": "2024-07-28T17:18:59.549Z"
    },
    {
        "_id": "66a67da1d5842b25dc337506",
        "description": "Shopping",
        "amount": 4299,
        "paidBy": {
            "name": "Hemant",
            "email": "hemant@example.com"
        },
        "participants": [
            {
                "name": "Chirag",
                "email": "chirag@example.com",
                "amount": 799
            },
            {
                "name": "Ayush",
                "email": "ayush@example.com",
                "amount": 2000
            },
            {
                "name": "Jai",
                "email": "jai@example.com",
                "amount": 1500
            }
        ],
        "splitType": "exact",
        "createdAt": "2024-07-28T17:19:29.545Z",
        "updatedAt": "2024-07-28T17:19:29.545Z"
    },
    {
        "_id": "66a68bff6f888f0dd3b66043",
        "description": "Dinner",
        "amount": 3000,
        "paidBy": {
            "name": "Trisha",
            "email": "trisha@example.com"
        },
        "participants": [
            {
                "name": "Helen",
                "email": "helen@example.com",
                "amount": 1000
            },
            {
                "name": "Mesha",
                "email": "mesha@example.com",
                "amount": 1000
            },
            {
                "name": "Karthik",
                "email": "karthik@example.com",
                "amount": 1000
            }
        ],
        "splitType": "equal",
        "createdAt": "2024-07-28T18:20:47.575Z",
        "updatedAt": "2024-07-28T18:20:47.575Z"
    },
    {
        "_id": "66a68c856f888f0dd3b6605a",
        "description": "Shopping",
        "amount": 4299,
        "paidBy": {
            "name": "abhishek",
            "email": "abhishek@example.com"
        },
        "participants": [
            {
                "name": "amisha",
                "email": "amisha@example.com",
                "amount": 799
            },
            {
                "name": "charu",
                "email": "charu@example.com",
                "amount": 2000
            },
            {
                "name": "ansh",
                "email": "ansh@example.com",
                "amount": 1500
            }
        ],
        "splitType": "exact",
        "createdAt": "2024-07-28T18:23:01.182Z",
        "updatedAt": "2024-07-28T18:23:01.182Z"
    },
    {
        "_id": "66a68cf56f888f0dd3b6606f",
        "description": "Party",
        "amount": 1000,
        "paidBy": {
            "name": "Misha",
            "email": "misha@example.com"
        },
        "participants": [
            {
                "name": "Misha",
                "email": "misha@example.com",
                "amount": 500
            },
            {
                "name": "Madhav",
                "email": "madhav@example.com",
                "amount": 250
            },
            {
                "name": "Rupali",
                "email": "rupali@example.com",
                "amount": 250
            }
        ],
        "splitType": "percentage",
        "createdAt": "2024-07-28T18:24:53.910Z",
        "updatedAt": "2024-07-28T18:24:53.910Z"
    }
]
```

![image](https://github.com/user-attachments/assets/aa0185b5-144a-477f-9b95-2df6e430e014)


**Download Balance Sheet**

**Endpoint:** api/expenses/balance-sheet

![image](https://github.com/user-attachments/assets/62b15bfe-4f2b-45a6-a1b1-070788746feb)






