import { VSCodeButton, VSCodeLink } from "@vscode/webview-ui-toolkit/react"

const ProjectsView = () => {
	const handleGenerateProject = () => {
		console.log("Generate eGovFrame project")
		// 향후 eGovFrame 프로젝트 생성 로직을 여기에 구현
	}

	const handleGenerateProjectWebview = () => {
		console.log("Generate eGovFrame project with webview form")
		// 향후 eGovFrame 프로젝트 웹뷰 폼 생성 로직을 여기에 구현
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
				Generate new eGovFrame projects from predefined templates. Choose from various project templates including basic
				Spring applications, web applications, and more. Learn more at{" "}
				<VSCodeLink href="https://github.com/chris-yoon/egovframe-pack" style={{ display: "inline" }}>
					GitHub
				</VSCodeLink>
				.
			</div>

			{/* Project Generation Section */}
			<div style={{ marginBottom: "30px" }}>
				<VSCodeButton
					appearance="primary"
					style={{ width: "100%", marginBottom: "10px" }}
					onClick={handleGenerateProject}>
					<span className="codicon codicon-new-folder" style={{ marginRight: "6px" }}></span>
					New Project (Command)
				</VSCodeButton>
				<p style={{ fontSize: "12px", color: "var(--vscode-descriptionForeground)", margin: "5px 0 15px 0" }}>
					Generate a new eGovFrame project using command interface
				</p>

				<VSCodeButton
					appearance="secondary"
					style={{ width: "100%", marginBottom: "10px" }}
					onClick={handleGenerateProjectWebview}>
					<span className="codicon codicon-browser" style={{ marginRight: "6px" }}></span>
					New Project (Form)
				</VSCodeButton>
				<p style={{ fontSize: "12px", color: "var(--vscode-descriptionForeground)", margin: "5px 0" }}>
					Generate a new eGovFrame project using interactive form interface
				</p>
			</div>

			{/* Available Templates Section */}
			<div
				style={{
					backgroundColor: "var(--vscode-editor-inactiveSelectionBackground)",
					padding: "15px",
					borderRadius: "4px",
					marginTop: "20px",
				}}>
				<h4 style={{ color: "var(--vscode-foreground)", marginBottom: "10px", marginTop: 0 }}>
					Available Project Templates
				</h4>
				<ul style={{ fontSize: "12px", color: "var(--vscode-foreground)", margin: "0", paddingLeft: "20px" }}>
					<li>Basic Spring Web Application</li>
					<li>RESTful API Application</li>
					<li>Full-stack Web Application with JSP</li>
					<li>Microservice Application</li>
					<li>Batch Processing Application</li>
				</ul>
			</div>
		</div>
	)
}

export default ProjectsView
