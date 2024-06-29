export const initialQuizManageData = () => {
    return {
        name: "",
        questions: [
            {
                text: "",
                answers: [
                    {
                        id: 1,
                        text: "",
                        scores: 0,
                        correct: false,
                    },
                    {
                        id: 2,
                        text: "",
                        scores: 0,
                        correct: false,
                    },
                    {
                        id: 3,
                        text: "",
                        scores: 0,
                        correct: false,
                    }
                ]
            }
        ]
    }
}

export const initialQuestionData = (id: number) => {
    return {
        id: id + 1,
        text: "",
        answers: [
            {
                id: 1,
                text: "",
                scores: 0,
                correct: false,
            },
        ]
    }
}