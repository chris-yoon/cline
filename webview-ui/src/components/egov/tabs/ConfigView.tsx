import { VSCodeButton, VSCodeDropdown, VSCodeOption, VSCodeLink } from "@vscode/webview-ui-toolkit/react"
import { useState, useEffect } from "react"
import { TemplateConfig, ConfigFormData } from "../types/templates"
import { loadTemplates, groupTemplates } from "../utils/templateUtils"
import DatasourceForm from "../forms/DatasourceForm"
import LoggingForm from "../forms/LoggingForm"
import { vscode } from "../../../utils/vscode"

const ConfigView = () => {
	const [templates, setTemplates] = useState<TemplateConfig[]>([])
	const [groupedTemplates, setGroupedTemplates] = useState<any[]>([])
	const [selectedTemplate, setSelectedTemplate] = useState<TemplateConfig | null>(null)
	const [selectedGroup, setSelectedGroup] = useState<string>("")
	const [showForm, setShowForm] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		try {
			const loadedTemplates = loadTemplates()
			setTemplates(loadedTemplates)
			const grouped = groupTemplates(loadedTemplates)
			setGroupedTemplates(grouped)
		} catch (error) {
			console.error("Failed to load templates:", error)
			vscode.postMessage({
				type: "showError",
				value: "Failed to load configuration templates. Please check if templates are properly installed.",
			})
		}
	}, [])

	const getTemplatesByGroup = (groupName: string) => {
		const group = groupedTemplates.find((g) => g.groupName === groupName)
		return group ? group.templates : []
	}

	const handleSelectTemplate = () => {
		console.log("handleSelectTemplate called, selectedGroup:", selectedGroup)

		if (!selectedGroup) {
			console.log("No group selected, showing warning")
			vscode.postMessage({
				type: "showWarning",
				value: "Please select a configuration type first.",
			})
			return
		}

		const templates = getTemplatesByGroup(selectedGroup)
		console.log("Templates for group", selectedGroup, ":", templates)

		if (templates.length === 0) {
			console.log("No templates found for group:", selectedGroup)
			vscode.postMessage({
				type: "showError",
				value: `No templates found for category: ${selectedGroup}`,
			})
			return
		}

		console.log("Setting selected template:", templates[0])
		setSelectedTemplate(templates[0])
		setShowForm(true)
	}

	const handleFormSubmit = async (formData: ConfigFormData) => {
		console.log("handleFormSubmit called with:", formData)
		console.log("selectedTemplate:", selectedTemplate)

		if (!selectedTemplate) {
			console.log("No template selected")
			return
		}

		setIsLoading(true)
		try {
			console.log("Sending generateConfig message to backend")
			// Send message to extension to generate config file
			vscode.postMessage({
				type: "generateConfig",
				value: {
					template: selectedTemplate,
					formData: formData,
					outputFolder: formData.outputFolder,
				},
			})

			console.log("Message sent, closing form")
			setShowForm(false)
			setSelectedTemplate(null)
		} catch (error) {
			console.error("Failed to generate config:", error)
			vscode.postMessage({
				type: "showError",
				value: "Failed to generate configuration file. Please try again.",
			})
		} finally {
			setIsLoading(false)
		}
	}

	const handleFormCancel = () => {
		setShowForm(false)
		setSelectedTemplate(null)
	}

	const handleUploadTemplates = () => {
		vscode.postMessage({
			type: "uploadTemplates",
		})
	}

	const handleDownloadTemplateContext = () => {
		vscode.postMessage({
			type: "downloadTemplateContext",
		})
	}

	const handleOpenPackageSettings = () => {
		vscode.postMessage({
			type: "openPackageSettings",
		})
	}

	const renderConfigForm = () => {
		if (!selectedTemplate) return null

		// Determine which form to render based on template
		if (selectedTemplate.displayName.toLowerCase().includes("datasource")) {
			return <DatasourceForm onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
		} else if (selectedTemplate.displayName.toLowerCase().includes("logging")) {
			const loggingType = selectedTemplate.displayName.toLowerCase().includes("console")
				? "console"
				: selectedTemplate.displayName.toLowerCase().includes("file")
					? "file"
					: "console"
			return (
				<LoggingForm
					onSubmit={handleFormSubmit}
					onCancel={handleFormCancel}
					loggingType={loggingType as "console" | "file" | "rollingFile"}
				/>
			)
		}

		// Default form for other templates (to be implemented)
		return (
			<div style={{ padding: "20px" }}>
				<h3>Configuration Form</h3>
				<p>Form for {selectedTemplate.displayName} is not yet implemented.</p>
				<VSCodeButton onClick={handleFormCancel}>Close</VSCodeButton>
			</div>
		)
	}

	if (showForm) {
		return renderConfigForm()
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
				Generate configuration files for eGovFrame applications. Create Spring configuration, database settings, security
				configurations, and more. Based on templates from{" "}
				<VSCodeLink href="https://github.com/chris-yoon/egovframe-pack" style={{ display: "inline" }}>
					egovframe-pack
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
				<h4 style={{ color: "var(--vscode-foreground)", marginBottom: "10px", marginTop: 0 }}>Configuration Type</h4>
				<VSCodeDropdown
					style={{ width: "100%", marginBottom: "10px" }}
					value={selectedGroup}
					onInput={(e: any) => setSelectedGroup(e.target.value)}>
					<VSCodeOption value="">Select configuration type...</VSCodeOption>
					{groupedTemplates.map((group) => (
						<VSCodeOption key={group.groupName} value={group.groupName}>
							{group.groupName}
						</VSCodeOption>
					))}
				</VSCodeDropdown>

				{selectedGroup && (
					<div style={{ fontSize: "12px", color: "var(--vscode-descriptionForeground)", marginTop: "5px" }}>
						Available templates:{" "}
						{getTemplatesByGroup(selectedGroup)
							.map((t: TemplateConfig) => t.displayName)
							.join(", ")}
					</div>
				)}
			</div>

			{/* Generate Button */}
			<div style={{ marginBottom: "20px" }}>
				<VSCodeButton
					appearance="primary"
					style={{ width: "100%", marginBottom: "10px" }}
					onClick={handleSelectTemplate}
					disabled={!selectedGroup || isLoading}>
					<span className="codicon codicon-file-code" style={{ marginRight: "6px" }}></span>
					{isLoading ? "Generating..." : "Generate Configuration Files"}
				</VSCodeButton>
				<p style={{ fontSize: "12px", color: "var(--vscode-descriptionForeground)", margin: "5px 0" }}>
					Generate configuration files based on selected type and project structure
				</p>
			</div>

			{/* Available Templates Info */}
			<div
				style={{
					backgroundColor: "var(--vscode-editor-inactiveSelectionBackground)",
					padding: "15px",
					borderRadius: "4px",
					marginTop: "20px",
				}}>
				<h4 style={{ color: "var(--vscode-foreground)", marginBottom: "10px", marginTop: 0 }}>
					Available Configuration Types ({templates.length} templates)
				</h4>
				<div style={{ fontSize: "12px", color: "var(--vscode-foreground)" }}>
					{groupedTemplates.map((group, index) => (
						<div key={group.groupName} style={{ marginBottom: "8px" }}>
							<strong>{group.groupName}:</strong> {group.templates.length} template(s)
							<div style={{ marginLeft: "10px", fontStyle: "italic" }}>
								{group.templates.map((t: TemplateConfig) => t.displayName).join(", ")}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default ConfigView
