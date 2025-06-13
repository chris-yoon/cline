import { useState, useEffect } from "react"
import {
	VSCodeButton,
	VSCodeDropdown,
	VSCodeOption,
	VSCodeTextField,
	VSCodeTextArea,
	VSCodeLink,
	VSCodeRadio,
	VSCodeRadioGroup,
} from "@vscode/webview-ui-toolkit/react"
import { vscode } from "../../../utils/vscode"
import {
	ProjectTemplate,
	ProjectConfig,
	PROJECT_TEMPLATES,
	PROJECT_CATEGORIES,
	getTemplatesByCategory,
	validateProjectConfig,
	getDefaultGroupId,
	generateSampleProjectName,
} from "../../../utils/projectUtils"

export const ProjectsView = () => {
	const [selectedCategory, setSelectedCategory] = useState<string>("All")
	const [selectedTemplate, setSelectedTemplate] = useState<ProjectTemplate | null>(null)
	const [projectName, setProjectName] = useState<string>("")
	const [groupID, setGroupID] = useState<string>(getDefaultGroupId())
	const [outputPath, setOutputPath] = useState<string>("")
	const [generationMethod, setGenerationMethod] = useState<"form" | "command">("form")
	const [validationErrors, setValidationErrors] = useState<string[]>([])
	const [isGenerating, setIsGenerating] = useState<boolean>(false)

	const filteredTemplates = getTemplatesByCategory(selectedCategory)

	useEffect(() => {
		// Initialize with sample project name and default output path
		setProjectName(generateSampleProjectName())
		setOutputPath("/Users/username/Projects") // Default path, would be replaced with workspace root
	}, [])

	const handleCategoryChange = (event: any) => {
		const category = event.target.value
		setSelectedCategory(category)
		setSelectedTemplate(null) // Reset template selection when category changes
	}

	const handleTemplateSelect = (template: ProjectTemplate) => {
		setSelectedTemplate(template)
		setValidationErrors([]) // Clear previous errors
	}

	const handleSelectOutputPath = () => {
		// For now, just show a file dialog simulation
		const defaultPath = "/Users/username/Projects" // This would be replaced with actual VS Code API
		setOutputPath(defaultPath)
		// TODO: Integrate with VS Code file dialog
		// vscode.postMessage({
		// 	type: "selectOutputPath",
		// });
	}

	const validateForm = (): boolean => {
		if (!selectedTemplate) {
			setValidationErrors(["Please select a project template"])
			return false
		}

		const config: Partial<ProjectConfig> = {
			projectName,
			groupID,
			outputPath,
			template: selectedTemplate,
		}

		const errors = validateProjectConfig(config)
		setValidationErrors(errors)
		return errors.length === 0
	}

	const handleGenerateProject = async () => {
		if (!validateForm()) {
			return
		}

		setIsGenerating(true)
		try {
			const config: ProjectConfig = {
				projectName,
				groupID,
				outputPath,
				template: selectedTemplate!,
			}

			// Simulate project generation for now
			console.log("Generating project with config:", config)

			// TODO: Integrate with VS Code API for actual project generation
			// vscode.postMessage({
			// 	type: "generateProject",
			// 	method: generationMethod,
			// 	projectConfig: config,
			// });

			// Simulate async operation
			await new Promise((resolve) => setTimeout(resolve, 2000))
			console.log("Project generation completed (simulated)")
		} catch (error) {
			console.error("Error generating project:", error)
		} finally {
			setIsGenerating(false)
		}
	}

	const handleGenerateByCommand = () => {
		// For now, just show a message
		console.log("Command-based generation requested")
		// TODO: Integrate with VS Code command palette
		// vscode.postMessage({
		// 	type: "generateProjectByCommand",
		// });
	}

	const handleInsertSample = () => {
		setProjectName(generateSampleProjectName())
		setGroupID(getDefaultGroupId())
		if (PROJECT_TEMPLATES.length > 0) {
			setSelectedTemplate(PROJECT_TEMPLATES[0])
		}
	}

	return (
		<div style={{ padding: "20px" }}>
			{/* Header */}
			<div style={{ marginBottom: "20px" }}>
				<h3 style={{ color: "var(--vscode-foreground)", marginTop: 0, marginBottom: "8px" }}>
					Generate eGovFrame Projects
				</h3>
				<p
					style={{
						fontSize: "12px",
						color: "var(--vscode-descriptionForeground)",
						margin: 0,
						marginTop: "5px",
					}}>
					Generate new eGovFrame projects from predefined templates. Choose from various project templates including
					basic Spring applications, web applications, and more. Learn more at{" "}
					<VSCodeLink href="https://github.com/chris-yoon/egovframe-pack" style={{ display: "inline" }}>
						GitHub
					</VSCodeLink>
				</p>
			</div>

			{/* Generation Method Selection */}
			<div style={{ marginBottom: "20px" }}>
				<h4 style={{ color: "var(--vscode-foreground)", marginBottom: "10px", marginTop: 0 }}>Generation Method</h4>
				<VSCodeRadioGroup value={generationMethod} onChange={(e: any) => setGenerationMethod(e.target.value)}>
					<VSCodeRadio value="form">Form-based Generation (Recommended)</VSCodeRadio>
					<VSCodeRadio value="command">Command-based Generation</VSCodeRadio>
				</VSCodeRadioGroup>
			</div>

			{generationMethod === "command" ? (
				/* Command-based Generation */
				<div>
					<div style={{ marginBottom: "20px" }}>
						<p style={{ fontSize: "12px", color: "var(--vscode-descriptionForeground)", marginBottom: "10px" }}>
							Use VS Code command palette to generate projects with step-by-step guidance.
						</p>
						<VSCodeButton appearance="primary" onClick={handleGenerateByCommand}>
							<span className="codicon codicon-terminal" style={{ marginRight: "6px" }}></span>
							Open Command Palette
						</VSCodeButton>
					</div>
				</div>
			) : (
				/* Form-based Generation */
				<div>
					{/* Template Category Selection */}
					<div style={{ marginBottom: "20px" }}>
						<h4 style={{ color: "var(--vscode-foreground)", marginBottom: "10px", marginTop: 0 }}>
							Template Category
						</h4>
						<VSCodeDropdown value={selectedCategory} onChange={handleCategoryChange}>
							{PROJECT_CATEGORIES.map((category) => (
								<VSCodeOption key={category} value={category}>
									{category}
								</VSCodeOption>
							))}
						</VSCodeDropdown>
					</div>

					{/* Template Selection */}
					<div style={{ marginBottom: "20px" }}>
						<h4 style={{ color: "var(--vscode-foreground)", marginBottom: "10px" }}>Template Selection</h4>
						<div
							style={{
								border: "1px solid var(--vscode-input-border)",
								borderRadius: "3px",
								padding: "10px",
								maxHeight: "200px",
								overflowY: "auto",
								backgroundColor: "var(--vscode-input-background)",
							}}>
							{filteredTemplates.map((template) => (
								<div
									key={template.fileName}
									style={{
										padding: "8px",
										margin: "4px 0",
										cursor: "pointer",
										borderRadius: "3px",
										backgroundColor:
											selectedTemplate?.fileName === template.fileName
												? "var(--vscode-list-activeSelectionBackground)"
												: "transparent",
										color:
											selectedTemplate?.fileName === template.fileName
												? "var(--vscode-list-activeSelectionForeground)"
												: "var(--vscode-foreground)",
									}}
									onClick={() => handleTemplateSelect(template)}>
									<div style={{ fontWeight: "bold", fontSize: "13px" }}>{template.displayName}</div>
									<div style={{ fontSize: "11px", opacity: 0.8, marginTop: "2px" }}>{template.description}</div>
									<div style={{ fontSize: "10px", opacity: 0.6, marginTop: "2px" }}>
										File: {template.fileName}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Project Configuration */}
					{selectedTemplate && (
						<div style={{ marginBottom: "20px" }}>
							<h4 style={{ color: "var(--vscode-foreground)", marginBottom: "10px" }}>Project Configuration</h4>

							{/* Project Name */}
							<div style={{ marginBottom: "15px" }}>
								<label style={{ display: "block", marginBottom: "5px", fontSize: "12px" }}>Project Name *</label>
								<VSCodeTextField
									value={projectName}
									placeholder="Enter project name"
									style={{ width: "100%" }}
									onInput={(e: any) => setProjectName(e.target.value)}
								/>
							</div>

							{/* Group ID (only if template has pomFile) */}
							{selectedTemplate.pomFile && (
								<div style={{ marginBottom: "15px" }}>
									<label style={{ display: "block", marginBottom: "5px", fontSize: "12px" }}>Group ID *</label>
									<VSCodeTextField
										value={groupID}
										placeholder="e.g., egovframework.example.sample"
										style={{ width: "100%" }}
										onInput={(e: any) => setGroupID(e.target.value)}
									/>
									<div
										style={{
											fontSize: "10px",
											color: "var(--vscode-descriptionForeground)",
											marginTop: "2px",
										}}>
										Java package naming convention (e.g., com.company.project)
									</div>
								</div>
							)}

							{/* Output Path */}
							<div style={{ marginBottom: "15px" }}>
								<label style={{ display: "block", marginBottom: "5px", fontSize: "12px" }}>Output Path *</label>
								<div style={{ display: "flex", gap: "10px" }}>
									<VSCodeTextField
										value={outputPath}
										placeholder="Select output directory"
										style={{ flex: 1 }}
										onInput={(e: any) => setOutputPath(e.target.value)}
									/>
									<VSCodeButton appearance="secondary" onClick={handleSelectOutputPath}>
										<span className="codicon codicon-folder-opened" style={{ marginRight: "6px" }}></span>
										Browse
									</VSCodeButton>
								</div>
							</div>

							{/* Template Info */}
							<div
								style={{
									backgroundColor: "var(--vscode-textBlockQuote-background)",
									border: "1px solid var(--vscode-textBlockQuote-border)",
									padding: "10px",
									borderRadius: "3px",
									marginBottom: "15px",
								}}>
								<div style={{ fontSize: "12px", marginBottom: "5px" }}>
									<strong>Selected Template:</strong> {selectedTemplate.displayName}
								</div>
								<div style={{ fontSize: "11px", color: "var(--vscode-descriptionForeground)" }}>
									{selectedTemplate.description}
								</div>
								{selectedTemplate.pomFile && (
									<div
										style={{
											fontSize: "10px",
											color: "var(--vscode-descriptionForeground)",
											marginTop: "5px",
										}}>
										Includes: Maven POM configuration
									</div>
								)}
							</div>
						</div>
					)}

					{/* Validation Errors */}
					{validationErrors.length > 0 && (
						<div style={{ marginBottom: "20px" }}>
							<div
								style={{
									backgroundColor: "var(--vscode-inputValidation-errorBackground)",
									border: "1px solid var(--vscode-inputValidation-errorBorder)",
									color: "var(--vscode-inputValidation-errorForeground)",
									padding: "10px",
									borderRadius: "3px",
								}}>
								<div style={{ fontWeight: "bold", marginBottom: "5px" }}>Validation Errors:</div>
								<ul style={{ margin: 0, paddingLeft: "20px" }}>
									{validationErrors.map((error, index) => (
										<li key={index} style={{ fontSize: "12px" }}>
											{error}
										</li>
									))}
								</ul>
							</div>
						</div>
					)}

					{/* Action Buttons */}
					<div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
						<VSCodeButton
							appearance="primary"
							disabled={isGenerating}
							onClick={handleGenerateProject}
							style={{ flex: 1 }}>
							{isGenerating ? (
								<>
									<span
										className="codicon codicon-loading codicon-modifier-spin"
										style={{ marginRight: "6px" }}></span>
									Generating...
								</>
							) : (
								<>
									<span className="codicon codicon-rocket" style={{ marginRight: "6px" }}></span>
									Generate Project
								</>
							)}
						</VSCodeButton>
						<VSCodeButton appearance="secondary" onClick={handleInsertSample}>
							<span className="codicon codicon-beaker" style={{ marginRight: "6px" }}></span>
							Sample
						</VSCodeButton>
					</div>
				</div>
			)}

			{/* Available Templates Info */}
			<div
				style={{
					backgroundColor: "var(--vscode-editor-background)",
					border: "1px solid var(--vscode-panel-border)",
					borderRadius: "3px",
					padding: "15px",
					marginTop: "20px",
				}}>
				<h4 style={{ color: "var(--vscode-foreground)", marginBottom: "10px", marginTop: 0 }}>
					Available Templates ({PROJECT_TEMPLATES.length})
				</h4>
				<div style={{ fontSize: "12px", color: "var(--vscode-foreground)" }}>
					<div style={{ marginBottom: "8px" }}>
						<strong>Categories:</strong>
					</div>
					<ul style={{ fontSize: "11px", color: "var(--vscode-foreground)", margin: "0", paddingLeft: "20px" }}>
						<li>
							<strong>Web:</strong> Basic web application projects
						</li>
						<li>
							<strong>Template:</strong> Pre-configured project templates
						</li>
						<li>
							<strong>Mobile:</strong> Mobile and hybrid app projects
						</li>
						<li>
							<strong>Boot:</strong> Spring Boot based projects
						</li>
						<li>
							<strong>MSA:</strong> Microservices architecture projects
						</li>
						<li>
							<strong>Batch:</strong> Batch processing projects
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default ProjectsView
