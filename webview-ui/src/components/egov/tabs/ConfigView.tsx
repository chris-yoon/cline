import { VSCodeButton, VSCodeDropdown, VSCodeOption, VSCodeLink } from "@vscode/webview-ui-toolkit/react"
import { useState } from "react"

const ConfigView = () => {
	const [selectedConfigType, setSelectedConfigType] = useState("spring")

	const handleGenerateConfig = () => {
		console.log("Generate configuration:", selectedConfigType)
		// 향후 설정 파일 생성 로직을 여기에 구현
	}

	const handleUploadTemplates = () => {
		console.log("Upload custom templates")
		// 향후 커스텀 템플릿 업로드 로직을 여기에 구현
	}

	const handleDownloadTemplateContext = () => {
		console.log("Download template context")
		// 향후 템플릿 컨텍스트 다운로드 로직을 여기에 구현
	}

	const handleOpenPackageSettings = () => {
		console.log("Open package settings")
		// 향후 패키지 설정 열기 로직을 여기에 구현
	}

	return (
		<div style={{ padding: "16px 20px" }}>
			<div
				style={{
					color: "var(--vscode-foreground)",
					fontSize: "13px",
					marginBottom: "16px",
					marginTop: "5px",
				}}>
				Generate configuration files for eGovFrame applications. Create Spring configuration, database settings,
				security configurations, and more. Learn more at{" "}
				<VSCodeLink href="https://github.com/chris-yoon/egovframe-pack" style={{ display: "inline" }}>
					GitHub
				</VSCodeLink>
				.
			</div>

			{/* Toolbar */}
			<div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
				<VSCodeButton appearance="secondary" onClick={handleUploadTemplates}>
					<span className="codicon codicon-cloud-upload" style={{ marginRight: "6px" }}></span>
					Upload Templates
				</VSCodeButton>
				<VSCodeButton appearance="secondary" onClick={handleDownloadTemplateContext}>
					<span className="codicon codicon-cloud-download" style={{ marginRight: "6px" }}></span>
					Download Template Context
				</VSCodeButton>
				<VSCodeButton appearance="secondary" onClick={handleOpenPackageSettings}>
					<span className="codicon codicon-gear" style={{ marginRight: "6px" }}></span>
					Package Settings
				</VSCodeButton>
			</div>

			{/* Configuration Type Selection */}
			<div style={{ marginBottom: "20px" }}>
				<h4 style={{ color: "var(--vscode-foreground)", marginBottom: "10px", marginTop: 0 }}>
					Configuration Type
				</h4>
				<VSCodeDropdown
					style={{ width: "100%", marginBottom: "10px" }}
					value={selectedConfigType}
					onInput={(e: any) => setSelectedConfigType(e.target.value)}>
					<VSCodeOption value="spring">Spring Configuration</VSCodeOption>
					<VSCodeOption value="database">Database Configuration</VSCodeOption>
					<VSCodeOption value="security">Security Configuration</VSCodeOption>
					<VSCodeOption value="web">Web Configuration</VSCodeOption>
					<VSCodeOption value="batch">Batch Configuration</VSCodeOption>
					<VSCodeOption value="logging">Logging Configuration</VSCodeOption>
				</VSCodeDropdown>
			</div>

			{/* Generate Button */}
			<div style={{ marginBottom: "20px" }}>
				<VSCodeButton
					appearance="primary"
					style={{ width: "100%", marginBottom: "10px" }}
					onClick={handleGenerateConfig}>
					<span className="codicon codicon-file-code" style={{ marginRight: "6px" }}></span>
					Generate Configuration Files
				</VSCodeButton>
				<p style={{ fontSize: "12px", color: "var(--vscode-descriptionForeground)", margin: "5px 0" }}>
					Generate configuration files based on selected type and project structure
				</p>
			</div>

			{/* Configuration Types Info */}
			<div
				style={{
					backgroundColor: "var(--vscode-editor-inactiveSelectionBackground)",
					padding: "15px",
					borderRadius: "4px",
					marginTop: "20px",
				}}>
				<h4 style={{ color: "var(--vscode-foreground)", marginBottom: "10px", marginTop: 0 }}>
					Available Configuration Types
				</h4>
				<div style={{ fontSize: "12px", color: "var(--vscode-foreground)" }}>
					<div style={{ marginBottom: "8px" }}>
						<strong>Spring Configuration:</strong> ApplicationContext, Bean definitions, AOP settings
					</div>
					<div style={{ marginBottom: "8px" }}>
						<strong>Database Configuration:</strong> DataSource, Transaction manager, JPA settings
					</div>
					<div style={{ marginBottom: "8px" }}>
						<strong>Security Configuration:</strong> Authentication, Authorization, CSRF protection
					</div>
					<div style={{ marginBottom: "8px" }}>
						<strong>Web Configuration:</strong> MVC settings, View resolvers, Interceptors
					</div>
					<div style={{ marginBottom: "8px" }}>
						<strong>Batch Configuration:</strong> Job definitions, Step configurations, Readers/Writers
					</div>
					<div>
						<strong>Logging Configuration:</strong> Logback, Log4j, SLF4J configurations
					</div>
				</div>
			</div>
		</div>
	)
}

export default ConfigView 