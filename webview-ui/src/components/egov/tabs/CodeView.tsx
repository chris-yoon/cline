import { VSCodeButton, VSCodeTextArea, VSCodeLink, VSCodeProgressRing } from "@vscode/webview-ui-toolkit/react"
import { useState, useEffect } from "react"
import { parseDDL, validateDDL, generateSampleDDL, ParsedDDL } from "../../../utils/ddlParser"
import { getTemplateContext } from "../../../utils/templateContext"
import { WebviewMessage, ExtensionResponse } from "../../../utils/messageTypes"

declare const vscode: {
	postMessage: (message: WebviewMessage) => void
}

const CodeView = () => {
	const [ddlContent, setDdlContent] = useState("")
	const [parsedDDL, setParsedDDL] = useState<ParsedDDL | null>(null)
	const [isValid, setIsValid] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState("")

	// DDL 유효성 검사 및 파싱
	useEffect(() => {
		if (!ddlContent.trim()) {
			setIsValid(false)
			setParsedDDL(null)
			setError("")
			return
		}

		try {
			const isValidDDL = validateDDL(ddlContent)
			setIsValid(isValidDDL)

			if (isValidDDL) {
				const parsed = parseDDL(ddlContent)
				setParsedDDL(parsed)
				setError("")
			} else {
				setParsedDDL(null)
				setError("Invalid DDL format")
			}
		} catch (err) {
			setIsValid(false)
			setParsedDDL(null)
			setError(err instanceof Error ? err.message : "Parsing error")
		}
	}, [ddlContent])

	// VSCode 익스텐션으로부터 메시지 수신
	useEffect(() => {
		const handleMessage = (event: MessageEvent<ExtensionResponse>) => {
			const message = event.data
			setIsLoading(false)

			switch (message.type) {
				case "error":
					setError(message.message)
					break
				case "success":
					setError("")
					// 성공 메시지 표시 (필요한 경우)
					break
				case "sampleDDL":
					setDdlContent(message.ddl)
					break
			}
		}

		window.addEventListener("message", handleMessage)
		return () => window.removeEventListener("message", handleMessage)
	}, [])

	const handleGenerateCode = () => {
		if (!isValid || !ddlContent.trim()) return

		setIsLoading(true)
		setError("")
		vscode.postMessage({
			type: "generateCode",
			ddl: ddlContent,
		})
	}

	const handleUploadTemplates = () => {
		if (!isValid || !ddlContent.trim()) return

		setIsLoading(true)
		setError("")
		vscode.postMessage({
			type: "uploadTemplates",
			ddl: ddlContent,
		})
	}

	const handleDownloadTemplateContext = () => {
		if (!isValid || !parsedDDL) return

		try {
			const context = getTemplateContext(parsedDDL.tableName, parsedDDL.attributes, parsedDDL.pkAttributes)

			setIsLoading(true)
			setError("")
			vscode.postMessage({
				type: "downloadTemplateContext",
				ddl: ddlContent,
				context,
			})
		} catch (err) {
			setError(err instanceof Error ? err.message : "Context generation error")
		}
	}

	const handleInsertSampleDDL = () => {
		const sampleDDL = generateSampleDDL()
		setDdlContent(sampleDDL)
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
				Generate CRUD operations and database-related code from DDL (Data Definition Language) statements. Supports
				Oracle, MySQL, PostgreSQL and more. Uses Handlebars template engine. Learn more at{" "}
				<VSCodeLink href="https://github.com/chris-yoon/egovframe-pack" style={{ display: "inline" }}>
					GitHub
				</VSCodeLink>
				.
			</div>

			{/* Toolbar */}
			<div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
				<VSCodeButton appearance="secondary" onClick={handleInsertSampleDDL}>
					<span className="codicon codicon-code" style={{ marginRight: "6px" }}></span>
					Insert Sample DDL
				</VSCodeButton>
			</div>

			{/* DDL Input Section */}
			<div style={{ marginBottom: "20px" }}>
				<h4 style={{ color: "var(--vscode-foreground)", marginBottom: "10px", marginTop: 0 }}>
					DDL Input
					{ddlContent.trim() && (
						<span
							style={{
								marginLeft: "10px",
								fontSize: "12px",
								color: isValid ? "var(--vscode-terminal-ansiGreen)" : "var(--vscode-errorForeground)",
							}}>
							{isValid ? "✓ Valid" : "✗ Invalid"}
						</span>
					)}
				</h4>
				<VSCodeTextArea
					rows={15}
					style={{
						width: "100%",
						fontFamily: "monospace",
						borderColor: error ? "var(--vscode-errorBorder)" : undefined,
					}}
					placeholder="Enter your DDL statements here..."
					value={ddlContent}
					onInput={(e: any) => setDdlContent(e.target.value)}
				/>
				{error && (
					<div
						style={{
							color: "var(--vscode-errorForeground)",
							fontSize: "12px",
							marginTop: "5px",
						}}>
						{error}
					</div>
				)}
			</div>

			{/* Parsed DDL Preview */}
			{parsedDDL && (
				<div style={{ marginBottom: "20px" }}>
					<h4 style={{ color: "var(--vscode-foreground)", marginBottom: "10px" }}>
						Parsed Table: {parsedDDL.tableName}
					</h4>
					<div
						style={{
							backgroundColor: "var(--vscode-editor-inactiveSelectionBackground)",
							padding: "10px",
							borderRadius: "4px",
							fontSize: "12px",
						}}>
						<div style={{ marginBottom: "8px" }}>
							<strong>Columns ({parsedDDL.attributes.length}):</strong>
						</div>
						{parsedDDL.attributes.map((col, index) => (
							<div key={index} style={{ marginLeft: "10px", marginBottom: "2px" }}>
								{col.columnName} ({col.dataType}) → {col.ccName} ({col.javaType})
								{col.isPrimaryKey && <span style={{ color: "var(--vscode-terminal-ansiYellow)" }}> [PK]</span>}
							</div>
						))}
					</div>
				</div>
			)}

			{/* Generation Options */}
			<div style={{ marginBottom: "20px" }}>
				<h4 style={{ color: "var(--vscode-foreground)", marginBottom: "10px" }}>Code Generation</h4>

				<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
					<VSCodeButton
						appearance="primary"
						style={{ width: "100%" }}
						onClick={handleGenerateCode}
						disabled={!isValid || isLoading}>
						{isLoading ? (
							<>
								<VSCodeProgressRing style={{ marginRight: "8px", width: "16px", height: "16px" }} />
								Generating...
							</>
						) : (
							<>
								<span className="codicon codicon-gear" style={{ marginRight: "6px" }}></span>
								Generate CRUD Code
							</>
						)}
					</VSCodeButton>

					<VSCodeButton
						appearance="secondary"
						style={{ width: "100%" }}
						onClick={handleUploadTemplates}
						disabled={!isValid || isLoading}>
						<span className="codicon codicon-file-code" style={{ marginRight: "6px" }}></span>
						Generate with Custom Templates
					</VSCodeButton>

					<VSCodeButton
						appearance="secondary"
						style={{ width: "100%" }}
						onClick={handleDownloadTemplateContext}
						disabled={!isValid || isLoading}>
						<span className="codicon codicon-json" style={{ marginRight: "6px" }}></span>
						Download Template Context
					</VSCodeButton>
				</div>

				<div style={{ fontSize: "12px", color: "var(--vscode-descriptionForeground)", marginTop: "10px" }}>
					<div>
						• <strong>Generate CRUD Code:</strong> Creates complete DAO, Service, Controller, and JSP files
					</div>
					<div>
						• <strong>Custom Templates:</strong> Upload your own Handlebars templates for code generation
					</div>
					<div>
						• <strong>Template Context:</strong> Download JSON context for creating custom templates
					</div>
				</div>
			</div>

			{/* Generated Code Types */}
			<div
				style={{
					backgroundColor: "var(--vscode-editor-inactiveSelectionBackground)",
					padding: "15px",
					borderRadius: "4px",
					marginTop: "20px",
				}}>
				<h4 style={{ color: "var(--vscode-foreground)", marginBottom: "10px", marginTop: 0 }}>Generated Code Includes</h4>
				<ul style={{ fontSize: "12px", color: "var(--vscode-foreground)", margin: "0", paddingLeft: "20px" }}>
					<li>DAO (Data Access Object) files</li>
					<li>Service layer implementations</li>
					<li>Controller classes</li>
					<li>JSP view templates</li>
					<li>SQL mapping files (MyBatis)</li>
					<li>Unit test cases</li>
				</ul>

				<div style={{ marginTop: "12px", fontSize: "12px", color: "var(--vscode-descriptionForeground)" }}>
					<strong>Handlebars Template Engine:</strong> Supports custom template creation with helpers like eq, concat,
					lowercase, etc.
				</div>
			</div>
		</div>
	)
}

export default CodeView
