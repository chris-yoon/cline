import { useState } from "react"
import {
	VSCodeButton,
	VSCodeDropdown,
	VSCodeOption,
	VSCodeTextField,
	VSCodeRadio,
	VSCodeRadioGroup,
} from "@vscode/webview-ui-toolkit/react"
import { ConfigGenerationType, ConfigFormData } from "../types/templates"

interface LoggingFormProps {
	onSubmit: (data: ConfigFormData) => void
	onCancel: () => void
	loggingType?: "console" | "file" | "rollingFile"
}

const LoggingForm: React.FC<LoggingFormProps> = ({ onSubmit, onCancel, loggingType = "console" }) => {
	const getDefaultFileName = (type: ConfigGenerationType) => {
		switch (loggingType) {
			case "console":
				return type === ConfigGenerationType.XML ? "logback-console" : "EgovLoggingConsoleConfig"
			case "file":
				return type === ConfigGenerationType.XML ? "logback-file" : "EgovLoggingFileConfig"
			case "rollingFile":
				return type === ConfigGenerationType.XML ? "logback-rollingFile" : "EgovLoggingRollingFileConfig"
			default:
				return "logback-console"
		}
	}

	const [formData, setFormData] = useState({
		generationType: ConfigGenerationType.XML,
		txtFileName: getDefaultFileName(ConfigGenerationType.XML),
		txtAppenderName: "CONSOLE",
		txtLevel: "INFO",
		txtPattern: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n",
		txtLoggerName: "egovframework",
		txtLoggerLevel: "DEBUG",
	})

	const handleGenerationTypeChange = (type: ConfigGenerationType) => {
		setFormData((prev) => ({
			...prev,
			generationType: type,
			txtFileName: getDefaultFileName(type),
		}))
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onSubmit(formData)
	}

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }))
	}

	const getFormTitle = () => {
		switch (loggingType) {
			case "console":
				return "Create Console Appender"
			case "file":
				return "Create File Appender"
			case "rollingFile":
				return "Create Rolling File Appender"
			default:
				return "Create Logging Configuration"
		}
	}

	return (
		<div style={{ padding: "20px", maxWidth: "600px" }}>
			<h2 style={{ color: "var(--vscode-foreground)", marginBottom: "20px" }}>{getFormTitle()}</h2>

			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: "20px" }}>
					<h3 style={{ color: "var(--vscode-foreground)", marginBottom: "10px" }}>Generation Type</h3>
					<VSCodeRadioGroup
						orientation="horizontal"
						value={formData.generationType}
						onChange={(e: any) => handleGenerationTypeChange(e.target.value as ConfigGenerationType)}>
						<VSCodeRadio value={ConfigGenerationType.XML}>XML</VSCodeRadio>
						<VSCodeRadio value={ConfigGenerationType.YAML}>YAML</VSCodeRadio>
						<VSCodeRadio value={ConfigGenerationType.PROPERTIES}>Properties</VSCodeRadio>
					</VSCodeRadioGroup>
				</div>

				<div style={{ marginBottom: "20px" }}>
					<h3 style={{ color: "var(--vscode-foreground)", marginBottom: "10px" }}>Generation File</h3>
					<VSCodeTextField
						value={formData.txtFileName}
						placeholder="Enter file name"
						onInput={(e: any) => handleInputChange("txtFileName", e.target.value)}
						style={{ width: "100%" }}>
						File Name
					</VSCodeTextField>
				</div>

				<div style={{ marginBottom: "20px" }}>
					<h3 style={{ color: "var(--vscode-foreground)", marginBottom: "10px" }}>Configuration</h3>

					<div style={{ marginBottom: "15px" }}>
						<VSCodeTextField
							value={formData.txtAppenderName}
							placeholder="Enter appender name"
							onInput={(e: any) => handleInputChange("txtAppenderName", e.target.value)}
							style={{ width: "100%" }}>
							Appender Name
						</VSCodeTextField>
					</div>

					<div style={{ marginBottom: "15px" }}>
						<label style={{ display: "block", marginBottom: "5px", color: "var(--vscode-foreground)" }}>
							Log Level
						</label>
						<VSCodeDropdown
							value={formData.txtLevel}
							onInput={(e: any) => handleInputChange("txtLevel", e.target.value)}
							style={{ width: "100%" }}>
							<VSCodeOption value="TRACE">TRACE</VSCodeOption>
							<VSCodeOption value="DEBUG">DEBUG</VSCodeOption>
							<VSCodeOption value="INFO">INFO</VSCodeOption>
							<VSCodeOption value="WARN">WARN</VSCodeOption>
							<VSCodeOption value="ERROR">ERROR</VSCodeOption>
						</VSCodeDropdown>
					</div>

					<div style={{ marginBottom: "15px" }}>
						<VSCodeTextField
							value={formData.txtPattern}
							placeholder="Enter log pattern"
							onInput={(e: any) => handleInputChange("txtPattern", e.target.value)}
							style={{ width: "100%" }}>
							Log Pattern
						</VSCodeTextField>
					</div>

					<div style={{ marginBottom: "15px" }}>
						<VSCodeTextField
							value={formData.txtLoggerName}
							placeholder="Enter logger name"
							onInput={(e: any) => handleInputChange("txtLoggerName", e.target.value)}
							style={{ width: "100%" }}>
							Logger Name
						</VSCodeTextField>
					</div>

					<div style={{ marginBottom: "20px" }}>
						<label style={{ display: "block", marginBottom: "5px", color: "var(--vscode-foreground)" }}>
							Logger Level
						</label>
						<VSCodeDropdown
							value={formData.txtLoggerLevel}
							onInput={(e: any) => handleInputChange("txtLoggerLevel", e.target.value)}
							style={{ width: "100%" }}>
							<VSCodeOption value="TRACE">TRACE</VSCodeOption>
							<VSCodeOption value="DEBUG">DEBUG</VSCodeOption>
							<VSCodeOption value="INFO">INFO</VSCodeOption>
							<VSCodeOption value="WARN">WARN</VSCodeOption>
							<VSCodeOption value="ERROR">ERROR</VSCodeOption>
						</VSCodeDropdown>
					</div>
				</div>

				<div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
					<VSCodeButton appearance="secondary" onClick={onCancel}>
						Cancel
					</VSCodeButton>
					<VSCodeButton type="submit" appearance="primary">
						Generate
					</VSCodeButton>
				</div>
			</form>
		</div>
	)
}

export default LoggingForm
