import { VSCodeButton } from "@vscode/webview-ui-toolkit/react"
import EgovframeLogo from "@/assets/EgovframeLogo"
import HeroTooltip from "@/components/common/HeroTooltip"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { EgovViewTab } from "@/shared/egovframe"

const HomeHeader = () => {
	const { navigateToEgov, setEgovTab } = useExtensionState()

	const handleEgovTabClick = (tabName: EgovViewTab) => {
		// 탭을 설정하고 eGovFrame으로 네비게이션
		setEgovTab(tabName)
		navigateToEgov()
	}

	return (
		<div className="flex flex-col items-center mb-5">
			<div className="my-5 flex items-center gap-3">
				<EgovframeLogo className="size-16 text-[var(--vscode-foreground)] opacity-100" />
			</div>
			<div className="text-center flex items-center justify-center mb-3">
				<h2 className="m-0 text-[var(--vscode-font-size)]">{"Ready to build with eGovFrame?"}</h2>
				<HeroTooltip
					placement="bottom"
					className="max-w-[350px]"
					content={
						"Create Korean eGovernment Framework projects with AI assistance. Generate projects from templates, auto-generate code from database schemas, and configure development environments with intelligent guidance."
					}>
					<span
						className="codicon codicon-info ml-2 cursor-pointer"
						style={{ fontSize: "14px", color: "var(--vscode-textLink-foreground)" }}
					/>
				</HeroTooltip>
			</div>

			{/* eGovFrame 기능 바로가기 버튼들 */}
			<div className="flex flex-col gap-2 w-full max-w-xs mb-4">
				<VSCodeButton
					appearance="secondary"
					onClick={() => handleEgovTabClick("projects")}
					style={{
						width: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-start",
						padding: "3px 12px",
						minHeight: "32px",
						fontSize: "13px",
						backgroundColor: "var(--vscode-button-secondaryBackground)",
						border: "1px solid var(--vscode-button-border)",
						borderRadius: "4px",
					}}>
					<span className="codicon codicon-add" style={{ marginRight: "8px", fontSize: "14px" }}></span>
					Generate new eGovFrame projects
				</VSCodeButton>

				<VSCodeButton
					appearance="secondary"
					onClick={() => handleEgovTabClick("code")}
					style={{
						width: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-start",
						padding: "3px 12px",
						minHeight: "32px",
						fontSize: "13px",
						backgroundColor: "var(--vscode-button-secondaryBackground)",
						border: "1px solid var(--vscode-button-border)",
						borderRadius: "4px",
					}}>
					<span className="codicon codicon-code" style={{ marginRight: "8px", fontSize: "14px" }}></span>
					Generate CRUD code from DDL
				</VSCodeButton>

				<VSCodeButton
					appearance="secondary"
					onClick={() => handleEgovTabClick("config")}
					style={{
						width: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-start",
						padding: "3px 12px",
						minHeight: "32px",
						fontSize: "13px",
						backgroundColor: "var(--vscode-button-secondaryBackground)",
						border: "1px solid var(--vscode-button-border)",
						borderRadius: "4px",
					}}>
					<span className="codicon codicon-settings-gear" style={{ marginRight: "8px", fontSize: "14px" }}></span>
					Generate configuration files
				</VSCodeButton>
			</div>

			<div className="text-center">
				<p className="text-sm text-[var(--vscode-descriptionForeground)] m-0">
					Choose an eGovFrame tool above or start a new AI conversation below
				</p>
			</div>
		</div>
	)
}

export default HomeHeader
