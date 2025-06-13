import { VSCodeButton, VSCodeTextArea, VSCodeLink } from "@vscode/webview-ui-toolkit/react"
import { useState } from "react"

const CodeView = () => {
	const [ddlContent, setDdlContent] = useState("")

	const handleGenerateCode = () => {
		console.log("Generate CRUD code from DDL:", ddlContent)
		// 향후 DDL로부터 CRUD 코드 생성 로직을 여기에 구현
	}

	const handleInsertSampleDDL = () => {
		const sampleDDL = `CREATE TABLE SAMPLE_TABLE (
    ID NUMBER(10) PRIMARY KEY,
    NAME VARCHAR2(100) NOT NULL,
    EMAIL VARCHAR2(200),
    PHONE VARCHAR2(20),
    CREATED_DATE DATE DEFAULT SYSDATE,
    UPDATED_DATE DATE
);

-- Add comments
COMMENT ON TABLE SAMPLE_TABLE IS 'Sample table for CRUD generation';
COMMENT ON COLUMN SAMPLE_TABLE.ID IS 'Primary key';
COMMENT ON COLUMN SAMPLE_TABLE.NAME IS 'User name';
COMMENT ON COLUMN SAMPLE_TABLE.EMAIL IS 'Email address';`
		setDdlContent(sampleDDL)
	}

	const handleRefreshSnippets = () => {
		console.log("Refresh code snippets")
		// 향후 코드 스니펫 새로고침 로직을 여기에 구현
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
				Generate CRUD operations and database-related code from DDL (Data Definition Language) statements.
				Supports Oracle, MySQL, PostgreSQL and more. Learn more at{" "}
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
				<VSCodeButton appearance="secondary" onClick={handleRefreshSnippets}>
					<span className="codicon codicon-refresh" style={{ marginRight: "6px" }}></span>
					Refresh Snippets
				</VSCodeButton>
			</div>

			{/* DDL Input Section */}
			<div style={{ marginBottom: "20px" }}>
				<h4 style={{ color: "var(--vscode-foreground)", marginBottom: "10px", marginTop: 0 }}>
					DDL Input
				</h4>
				<VSCodeTextArea
					style={{ width: "100%", height: "200px", fontFamily: "monospace" }}
					placeholder="Enter your DDL statements here..."
					value={ddlContent}
					onInput={(e: any) => setDdlContent(e.target.value)}
				/>
			</div>

			{/* Generation Options */}
			<div style={{ marginBottom: "20px" }}>
				<h4 style={{ color: "var(--vscode-foreground)", marginBottom: "10px" }}>
					Code Generation
				</h4>
				<VSCodeButton
					appearance="primary"
					style={{ width: "100%", marginBottom: "10px" }}
					onClick={handleGenerateCode}
					disabled={!ddlContent.trim()}>
					<span className="codicon codicon-gear" style={{ marginRight: "6px" }}></span>
					Generate CRUD Code
				</VSCodeButton>
				<p style={{ fontSize: "12px", color: "var(--vscode-descriptionForeground)", margin: "5px 0" }}>
					Generate complete CRUD operations including DAO, Service, Controller, and JSP files
				</p>
			</div>

			{/* Generated Code Types */}
			<div
				style={{
					backgroundColor: "var(--vscode-editor-inactiveSelectionBackground)",
					padding: "15px",
					borderRadius: "4px",
					marginTop: "20px",
				}}>
				<h4 style={{ color: "var(--vscode-foreground)", marginBottom: "10px", marginTop: 0 }}>
					Generated Code Includes
				</h4>
				<ul style={{ fontSize: "12px", color: "var(--vscode-foreground)", margin: "0", paddingLeft: "20px" }}>
					<li>DAO (Data Access Object) files</li>
					<li>Service layer implementations</li>
					<li>Controller classes</li>
					<li>JSP view templates</li>
					<li>SQL mapping files (MyBatis)</li>
					<li>Unit test cases</li>
				</ul>
			</div>
		</div>
	)
}

export default CodeView 