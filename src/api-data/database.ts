import { initialQuizData } from "./quizdata";

interface Answers {
    id: number;
    text: string;
    scores: number;
    correct: boolean;
}

export interface Quiz {
    id?: number;
    name: string
    questions: QuizItem[];
}

export interface QuizItem {
    id?: number;
    text: string;
    answers: Answers[];
}


export function getQuizlets(): Quiz[] {
    const quizletsJson = localStorage.getItem('quizlets');
    if (quizletsJson) {
        return JSON.parse(quizletsJson);
    }
    localStorage.setItem('quizlets', JSON.stringify(initialQuizData));
    return JSON.parse(localStorage.getItem('quizlets') || '[]');
}

export function getQuizletById(quizletId: number): Quiz | undefined {
    const quizlets = getQuizlets();
    return quizlets.find(quiz => quiz.id === quizletId);
}

export function addQuizlets(newQuizlets: Quiz[]): void {
    const quizlets = getQuizlets();
    quizlets.push(...newQuizlets);
    localStorage.setItem('quizlets', JSON.stringify(quizlets));
}

export function updateQuizletById(quizletId: number, updatedQuizlet: Quiz): boolean {
    const quizlets = getQuizlets();
    const index = quizlets.findIndex(quiz => quiz.id === quizletId);
    if (index !== -1) {
        quizlets[index] = updatedQuizlet;
        localStorage.setItem('quizlets', JSON.stringify(quizlets));
        return true;
    }
    console.log(`Quizlet with id ${quizletId} not found.`);
    return false;
}

export function deleteQuizletById(quizletId: number): boolean {
    const quizlets = getQuizlets();
    const index = quizlets.findIndex(quiz => quiz.id === quizletId);
    if (index !== -1) {
        quizlets.splice(index, 1);
        localStorage.setItem('quizlets', JSON.stringify(quizlets));
        return true;
    }
    console.log(`Quizlet with id ${quizletId} not found.`);
    return false;
}