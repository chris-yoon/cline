import { VSCodeButton, VSCodeLink } from "@vscode/webview-ui-toolkit/react"
import { useEffect, useState, memo } from "react"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { validateApiConfiguration } from "@/utils/validate"
import { vscode } from "@/utils/vscode"
import ApiOptions from "@/components/settings/ApiOptions"
import ClineLogoWhite from "@/assets/ClineLogoWhite"
import EgovframeLogo from "@/assets/EgovframeLogo"
import { AccountServiceClient } from "@/services/grpc-client"
import { EmptyRequest } from "@shared/proto/common"

const WelcomeView = memo(() => {
	const { apiConfiguration } = useExtensionState()
	const [apiErrorMessage, setApiErrorMessage] = useState<string | undefined>(undefined)
	const [showApiOptions, setShowApiOptions] = useState(false)

	const disableLetsGoButton = apiErrorMessage != null

	const handleLogin = () => {
		AccountServiceClient.accountLoginClicked(EmptyRequest.create()).catch((err) =>
			console.error("Failed to get login URL:", err),
		)
	}

	const handleSubmit = () => {
		vscode.postMessage({ type: "apiConfiguration", apiConfiguration })
	}

	const handleEgovTabClick = (tabName: string) => {
		// eGov 버튼을 클릭한 것과 동일한 효과를 위해 invoke 메시지 사용
		vscode.postMessage({
			type: "invoke",
			text: "egovButtonClicked",
		})
		// 탭 전환을 위한 추가 메시지 (EgovView에서 특정 탭을 활성화하도록)
		setTimeout(() => {
			vscode.postMessage({
				type: "switchEgovTab",
				text: tabName,
			})
		}, 100)
	}

	useEffect(() => {
		setApiErrorMessage(validateApiConfiguration(apiConfiguration))
	}, [apiConfiguration])

	return (
		<div className="fixed inset-0 p-0 flex flex-col">
			<div className="h-full px-5 overflow-auto">
				<div className="text-center mb-6">
					<h2 className="mb-2">Welcome to eGovFrame Initializr</h2>
					<p className="text-sm text-[var(--vscode-descriptionForeground)] mb-4">Powered by Cline AI Assistant</p>
				</div>

				<div className="flex justify-center my-6">
					<div className="relative">
						<EgovframeLogo className="size-20 text-[var(--vscode-foreground)]" />
						<div className="absolute -bottom-2 -right-2">
							<ClineLogoWhite className="size-8 opacity-60" />
						</div>
					</div>
				</div>

				<div className="mb-6">
					<h3 className="text-lg font-semibold mb-3 text-center">eGovFrame Development Tools</h3>
					<p className="text-sm text-[var(--vscode-descriptionForeground)] mb-4">
						Create and manage Korean eGovernment Framework projects with ease. Choose from various project templates,
						generate code automatically, and configure your development environment.
					</p>
				</div>

				{/* eGovFrame 기능 바로가기 */}
				<div className="space-y-3 mb-6">
					<div className="grid grid-cols-1 gap-3">
						<VSCodeButton
							appearance="primary"
							onClick={() => handleEgovTabClick("projects")}
							className="w-full justify-start">
							<span className="codicon codicon-rocket mr-3"></span>
							<div className="text-left">
								<div className="font-semibold">Project Generation</div>
								<div className="text-xs opacity-75">Create new eGovFrame projects from 20+ templates</div>
							</div>
						</VSCodeButton>

						<VSCodeButton
							appearance="secondary"
							onClick={() => handleEgovTabClick("code")}
							className="w-full justify-start">
							<span className="codicon codicon-code mr-3"></span>
							<div className="text-left">
								<div className="font-semibold">Code Generation</div>
								<div className="text-xs opacity-75">Auto-generate Controllers, Services, DAOs from DDL</div>
							</div>
						</VSCodeButton>

						<VSCodeButton
							appearance="secondary"
							onClick={() => handleEgovTabClick("config")}
							className="w-full justify-start">
							<span className="codicon codicon-settings-gear mr-3"></span>
							<div className="text-left">
								<div className="font-semibold">Configuration</div>
								<div className="text-xs opacity-75">Generate DataSource, Transaction, Logging configurations</div>
							</div>
						</VSCodeButton>
					</div>
				</div>

				{/* 구분선 */}
				<div className="border-t border-[var(--vscode-panel-border)] my-6"></div>

				{/* 기존 Cline 설정 섹션 */}
				<div className="mb-4">
					<h3 className="text-lg font-semibold mb-3">AI Assistant Setup</h3>
					<p className="text-sm text-[var(--vscode-descriptionForeground)] mb-4">
						Configure your AI assistant to help with development tasks. eGovFrame tools are enhanced with{" "}
						<VSCodeLink href="https://www.anthropic.com/claude/sonnet" className="inline">
							Claude 4 Sonnet's
						</VSCodeLink>{" "}
						capabilities for intelligent code generation and project management.
					</p>

					<p className="text-sm text-[var(--vscode-descriptionForeground)] mb-4">
						Sign up for an account to get started for free, or use an API key that provides access to models like
						Claude 4 Sonnet.
					</p>

					<VSCodeButton appearance="primary" onClick={handleLogin} className="w-full">
						Get Started for Free
					</VSCodeButton>

					{!showApiOptions && (
						<VSCodeButton
							appearance="secondary"
							onClick={() => setShowApiOptions(!showApiOptions)}
							className="mt-2.5 w-full">
							Use your own API key
						</VSCodeButton>
					)}

					<div className="mt-4">
						{showApiOptions && (
							<div>
								<ApiOptions showModelOptions={false} />
								<VSCodeButton onClick={handleSubmit} disabled={disableLetsGoButton} className="mt-3">
									Let's go!
								</VSCodeButton>
							</div>
						)}
					</div>
				</div>

				{/* 푸터 정보 */}
				<div className="mt-6 pt-4 border-t border-[var(--vscode-panel-border)] text-center">
					<p className="text-xs text-[var(--vscode-descriptionForeground)]">
						eGovFrame Initializr • Korean eGovernment Standard Framework
					</p>
					<p className="text-xs text-[var(--vscode-descriptionForeground)] mt-1">
						<VSCodeLink href="https://github.com/chris-yoon/egovframe-pack" className="inline">
							Learn more about eGovFrame
						</VSCodeLink>
					</p>
				</div>
			</div>
		</div>
	)
})

export default WelcomeView
