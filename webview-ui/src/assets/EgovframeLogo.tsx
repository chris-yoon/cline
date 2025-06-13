import React from "react"

interface EgovframeLogoProps {
	className?: string
	style?: React.CSSProperties
}

const EgovframeLogo: React.FC<EgovframeLogoProps> = ({ className, style }) => {
	return (
		<svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
			{/* eGovFrame 로고 기본 형태 */}
			<circle cx="60" cy="60" r="55" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />

			{/* 중앙의 e 글자 */}
			<g transform="translate(35, 35)">
				<path
					d="M25 10 L45 10 L45 20 L35 20 L35 30 L43 30 L43 40 L35 40 L35 50 L45 50 L45 60 L25 60 Z"
					fill="currentColor"
					fillOpacity="0.8"
				/>
			</g>

			{/* 하단의 Gov 텍스트 표시를 위한 장식 */}
			<g transform="translate(20, 75)">
				<rect x="0" y="0" width="8" height="15" fill="currentColor" fillOpacity="0.6" />
				<rect x="12" y="0" width="8" height="15" fill="currentColor" fillOpacity="0.6" />
				<rect x="24" y="0" width="8" height="15" fill="currentColor" fillOpacity="0.6" />
				<rect x="36" y="0" width="8" height="15" fill="currentColor" fillOpacity="0.6" />
				<rect x="48" y="0" width="8" height="15" fill="currentColor" fillOpacity="0.6" />
				<rect x="60" y="0" width="8" height="15" fill="currentColor" fillOpacity="0.6" />
			</g>

			{/* 프레임워크를 상징하는 구조적 요소들 */}
			<g stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4">
				<rect x="15" y="15" width="90" height="90" rx="5" />
				<line x1="25" y1="25" x2="95" y2="25" />
				<line x1="25" y1="35" x2="95" y2="35" />
				<line x1="25" y1="95" x2="95" y2="95" />
				<line x1="25" y1="25" x2="25" y2="95" />
				<line x1="95" y1="25" x2="95" y2="95" />
			</g>
		</svg>
	)
}

export default EgovframeLogo
