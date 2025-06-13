import { VSCodeButton, VSCodeLink } from "@vscode/webview-ui-toolkit/react"
import { memo } from "react"

interface EgovViewProps {
	onDone: () => void
}

const EgovView = memo(({ onDone }: EgovViewProps) => {
	const handleGenerateProject = () => {
		console.log("Generate eGovFrame project")
		// 향후 eGovFrame 프로젝트 생성 로직을 여기에 구현
	}

	const handleGenerateCode = () => {
		console.log("Generate CRUD code from DDL")
		// 향후 DDL로부터 CRUD 코드 생성 로직을 여기에 구현
	}

	const handleGenerateConfig = () => {
		console.log("Generate configuration")
		// 향후 설정 파일 생성 로직을 여기에 구현
	}

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				display: "flex",
				flexDirection: "column",
			}}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "10px 17px 5px 20px",
				}}>
				<h3 style={{ color: "var(--vscode-foreground)", margin: 0 }}>eGovFrame Initializr</h3>
				<VSCodeButton onClick={onDone}>Done</VSCodeButton>
			</div>

			<div style={{ flex: 1, overflow: "auto", padding: "0 20px 20px 20px" }}>
				{/* Header */}
				<div
					style={{
						color: "var(--vscode-foreground)",
						fontSize: "13px",
						marginBottom: "20px",
						marginTop: "10px",
					}}>
					<p>
						eGovFrame Initializr provides tools to generate eGovFrame projects and code from templates and DDL. Learn
						more at{" "}
						<VSCodeLink href="https://github.com/chris-yoon/egovframe-pack" style={{ display: "inline" }}>
							GitHub
						</VSCodeLink>
						.
					</p>
				</div>

				{/* Project Generation Section */}
				<div style={{ marginBottom: "30px" }}>
					<h4 style={{ color: "var(--vscode-foreground)", marginBottom: "10px" }}>Project Generation</h4>
					<VSCodeButton
						appearance="primary"
						style={{ width: "100%", marginBottom: "10px" }}
						onClick={handleGenerateProject}>
						<span className="codicon codicon-new-folder" style={{ marginRight: "6px" }}></span>
						Generate New eGovFrame Project
					</VSCodeButton>
					<p style={{ fontSize: "12px", color: "var(--vscode-descriptionForeground)", margin: "5px 0" }}>
						Create a new eGovFrame project from predefined templates
					</p>
				</div>

				{/* Code Generation Section */}
				<div style={{ marginBottom: "30px" }}>
					<h4 style={{ color: "var(--vscode-foreground)", marginBottom: "10px" }}>Code Generation</h4>
					<VSCodeButton
						appearance="secondary"
						style={{ width: "100%", marginBottom: "10px" }}
						onClick={handleGenerateCode}>
						<span className="codicon codicon-code" style={{ marginRight: "6px" }}></span>
						Generate CRUD Code from DDL
					</VSCodeButton>
					<p style={{ fontSize: "12px", color: "var(--vscode-descriptionForeground)", margin: "5px 0" }}>
						Generate CRUD operations and database-related code from DDL statements
					</p>
				</div>

				{/* Configuration Section */}
				<div style={{ marginBottom: "30px" }}>
					<h4 style={{ color: "var(--vscode-foreground)", marginBottom: "10px" }}>Configuration</h4>
					<VSCodeButton
						appearance="secondary"
						style={{ width: "100%", marginBottom: "10px" }}
						onClick={handleGenerateConfig}>
						<span className="codicon codicon-gear" style={{ marginRight: "6px" }}></span>
						Generate Configuration Files
					</VSCodeButton>
					<p style={{ fontSize: "12px", color: "var(--vscode-descriptionForeground)", margin: "5px 0" }}>
						Generate configuration files for eGovFrame applications
					</p>
				</div>

				{/* Information Section */}
				<div
					style={{
						backgroundColor: "var(--vscode-editor-inactiveSelectionBackground)",
						padding: "15px",
						borderRadius: "4px",
						marginTop: "20px",
					}}>
					<h4 style={{ color: "var(--vscode-foreground)", marginBottom: "10px", marginTop: 0 }}>About eGovFrame</h4>
					<p style={{ fontSize: "12px", color: "var(--vscode-foreground)", margin: "0 0 10px 0" }}>
						eGovFrame is a development framework for building e-government applications. It provides:
					</p>
					<ul style={{ fontSize: "12px", color: "var(--vscode-foreground)", margin: "0", paddingLeft: "20px" }}>
						<li>Spring-based application framework</li>
						<li>Common components for government services</li>
						<li>Development tools and templates</li>
						<li>Security and authentication modules</li>
					</ul>
				</div>
			</div>
		</div>
	)
})

EgovView.displayName = "EgovView"

export default EgovView
