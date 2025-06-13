import React from "react"

interface EgovframeLogoProps {
	className?: string
	style?: React.CSSProperties
}

const EgovframeLogo: React.FC<EgovframeLogoProps> = ({ className, style }) => (
	<svg className={className} style={style} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
		{/* 외부 원형 프레임 - 글자와 여백을 두어 배치 */}
		<circle cx="50" cy="50" r="45" stroke="#BDC3C7" strokeWidth="2.5" fill="none" opacity="0.9" />
		{/* eGov 텍스트 - 상단 중앙 배치, 원형 테두리와 여백 유지 */}
		<text
			x="50"
			y="38"
			textAnchor="middle"
			alignmentBaseline="middle"
			fontWeight="700"
			fontSize="26"
			fill="#BDC3C7"
			fontFamily="Arial, Roboto, sans-serif"
			opacity="1">
			eGov
		</text>
		{/* Frame 텍스트 - 하단 중앙 배치, 원형 테두리와 여백 유지 */}
		<text
			x="50"
			y="72"
			textAnchor="middle"
			alignmentBaseline="middle"
			fontWeight="700"
			fontSize="26"
			fill="#BDC3C7"
			fontFamily="Arial, Roboto, sans-serif"
			opacity="1">
			Frame
		</text>
	</svg>
)

export default EgovframeLogo
