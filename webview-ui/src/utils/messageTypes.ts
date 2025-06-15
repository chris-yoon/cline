import { TemplateContext } from "./templateContext"

export interface GenerateCodeMessage {
	type: "generateCode"
	ddl: string
}

export interface UploadTemplatesMessage {
	type: "uploadTemplates"
	ddl: string
}

export interface DownloadTemplateContextMessage {
	type: "downloadTemplateContext"
	ddl: string
	context: TemplateContext
}

export interface InsertSampleDDLMessage {
	type: "insertSampleDDL"
}

export type WebviewMessage =
	| GenerateCodeMessage
	| UploadTemplatesMessage
	| DownloadTemplateContextMessage
	| InsertSampleDDLMessage

export interface ErrorResponse {
	type: "error"
	message: string
}

export interface SuccessResponse {
	type: "success"
	message: string
}

export interface SampleDDLResponse {
	type: "sampleDDL"
	ddl: string
}

export type ExtensionResponse = ErrorResponse | SuccessResponse | SampleDDLResponse
