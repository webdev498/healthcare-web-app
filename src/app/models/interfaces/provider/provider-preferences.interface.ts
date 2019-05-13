import { IProviderSecurityQuestion }  from './provider-security-question.interface'

export interface IProviderPreferences {
    providerID              :   number,
    MinAge 	                :   number,
    MaxAge 	                :   number,
    Phone 	                :   string,
    Email 	                :   string,
    NotificationPreference 	:   string,
    RepeatAlerts 	        :   string,
    SecurityQuestionAnswer 	:   IProviderSecurityQuestion[]
}
