export interface TemplateConfig {
	displayName: string
	templateFolder: string
	templateFile: string
	webView: string
	fileNameProperty: string
	javaConfigTemplate?: string
	yamlTemplate?: string
	propertiesTemplate?: string
}

export interface GroupedTemplates {
	groupName: string
	templates: TemplateConfig[]
}

export enum ConfigGenerationType {
	XML = "xml",
	JAVA_CONFIG = "javaConfig",
	YAML = "yaml",
	PROPERTIES = "properties",
}

export interface ConfigFormData {
	[key: string]: any
	txtFileName: string
	generationType: ConfigGenerationType
}
