const answerStatuses = {
    isAnswerChecked: false,
    isResultShowed: false,
    isManage: true
}

export interface InitialStatuses {
    isAnswerChecked: boolean;
    isResultShowed: boolean;
    isManage: boolean;
}


export const initiateStatuses = () => {
    return {...answerStatuses}
}