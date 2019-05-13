import { SecurityQuestionAnswerDTO } from "./security-question-answer.interface";

export interface UserSecurityQuestionsDTO {
    PatientID   : number,
    Answers     : SecurityQuestionAnswerDTO[]
}
