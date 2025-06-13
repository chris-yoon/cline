# eGovFrame Initializr Integration

이 문서는 Cline VS Code Extension에 통합된 eGovFrame Initializr 기능에 대해 설명합니다.

## 📋 개요

eGovFrame Initializr는 한국의 전자정부 표준프레임워크인 eGovFrame 프로젝트를 쉽게 생성할 수 있는 도구입니다. 이 기능은 기존의 [egovframe-pack](https://github.com/chris-yoon/egovframe-pack) 프로젝트의 리소스를 활용하여 Cline 확장에 통합되었습니다.

## 🚀 주요 기능

### 1. 프로젝트 생성 (Projects)
- **20개의 프로젝트 템플릿** 지원
- **카테고리별 분류**: Web, Template, Mobile, Boot, MSA, Batch
- **VS Code 파일 다이얼로그** 통합으로 출력 경로 선택
- **실시간 프로젝트 생성 진행상황** 표시
- **Maven POM 파일 자동 생성** (Handlebars 템플릿 활용)
- **프로젝트 생성 후 자동으로 VS Code에서 열기** 옵션

### 2. 코드 생성 (Code Generation) - 예정
- DDL 파싱을 통한 자동 코드 생성
- Controller, Service, DAO, Mapper, VO 템플릿 지원

### 3. 설정 생성 (Configuration) - 예정
- DataSource, Transaction, Logging, Scheduling, Cache 설정 생성

## 🎯 사용 방법

### 1. eGovFrame 탭 접근
1. Cline 사이드바 열기
2. 상단 툴바에서 eGovFrame 아이콘 클릭
3. "Projects" 탭 선택

### 2. 프로젝트 생성 과정
1. **템플릿 카테고리 선택** (All, Web, Template, Mobile, Boot, MSA, Batch)
2. **프로젝트 템플릿 선택** (20개 템플릿 중 선택)
3. **프로젝트 설정**:
   - Project Name: 프로젝트 이름 (파일시스템 호환성 검증)
   - Group ID: Maven 그룹 ID (Java 패키지 네이밍 규칙)
   - Output Path: 출력 디렉토리 (Browse 버튼으로 선택)
4. **프로젝트 생성** 버튼 클릭
5. 생성 완료 후 VS Code에서 프로젝트 열기

### 3. 템플릿 종류
- **Web**: 기본 웹 애플리케이션
- **Template**: 미리 구성된 프로젝트 템플릿
- **Mobile**: 모바일 및 하이브리드 앱
- **Boot**: Spring Boot 기반 프로젝트
- **MSA**: 마이크로서비스 아키텍처
- **Batch**: 배치 처리 프로젝트

## 🛠 기술 구조

### Frontend (React)
- **ProjectsView.tsx**: 메인 프로젝트 생성 인터페이스
- **projectUtils.ts**: 프로젝트 템플릿 정의 및 유틸리티
- **egovUtils.ts**: eGovFrame 관련 헬퍼 함수

### Backend (Node.js/VS Code Extension)
- **egovProjectGenerator.ts**: 실제 프로젝트 생성 로직
- **Controller**: WebView 메시지 처리 및 VS Code API 통합

### 재사용된 리소스 (egovframe-pack)
- **examples/*.zip**: 20개 프로젝트 템플릿 (~70MB)
- **templates/project/*.xml**: Maven POM 템플릿 (15개)
- **templates/code/*.hbs**: 코드 생성 템플릿 (12개)
- **templates/config/**: 설정 템플릿

## 📁 파일 구조

```
src/
├── utils/
│   └── egovProjectGenerator.ts     # 프로젝트 생성 엔진
├── core/controller/
│   └── index.ts                    # WebView 메시지 처리
webview-ui/src/
├── components/egov/
│   ├── EgovView.tsx               # 메인 eGov 뷰
│   └── tabs/
│       ├── ProjectsView.tsx       # 프로젝트 생성 탭
│       ├── CodeView.tsx           # 코드 생성 탭 (예정)
│       └── ConfigView.tsx         # 설정 생성 탭 (예정)
├── utils/
│   ├── projectUtils.ts            # 프로젝트 템플릿 정의
│   └── egovUtils.ts               # eGov 유틸리티
egovframe-pack/                    # 서브모듈 (재사용 리소스)
├── examples/                      # 프로젝트 템플릿 ZIP 파일
├── templates/project/             # Maven POM 템플릿
├── templates/code/                # 코드 생성 템플릿
└── templates/config/              # 설정 템플릿
```

## 🔧 메시지 흐름

### 프로젝트 생성 시퀀스
1. **WebView → Extension**: `selectOutputPath` 메시지
2. **Extension**: VS Code 파일 다이얼로그 표시
3. **Extension → WebView**: `selectedOutputPath` 응답
4. **WebView → Extension**: `generateProject` 메시지 (프로젝트 설정 포함)
5. **Extension**: 
   - 템플릿 ZIP 파일 추출
   - POM 파일 생성 (Handlebars)
   - 프로젝트 디렉토리 생성
6. **Extension → WebView**: `projectGenerationProgress` (진행상황)
7. **Extension → WebView**: `projectGenerationResult` (완료/실패)
8. **Extension**: VS Code에서 프로젝트 열기 옵션 제공

## 🎨 UI/UX 특징

- **카테고리 기반 필터링**: 템플릿을 카테고리별로 쉽게 탐색
- **실시간 유효성 검사**: 프로젝트 이름 및 설정 실시간 검증
- **진행상황 표시**: 프로젝트 생성 과정을 실시간으로 모니터링
- **VS Code 네이티브 UI**: VS Code UI Toolkit 컴포넌트 사용
- **접근성 고려**: 키보드 내비게이션 및 스크린 리더 지원

## 🚧 향후 계획

### Phase 2: 코드 생성 (CodeView)
- DDL 파싱 엔진 통합
- Controller/Service/DAO 자동 생성
- Handlebars 템플릿 시스템 활용

### Phase 3: 설정 생성 (ConfigView)
- DataSource 설정 마법사
- 트랜잭션 관리 설정
- 로깅 및 스케줄링 설정

### Phase 4: 고급 기능
- 프로젝트 업그레이드 도구
- 의존성 관리 및 업데이트
- 프로젝트 분석 및 리포트

## 📦 의존성

### 추가된 패키지
- **extract-zip**: ZIP 파일 추출
- **fs-extra**: 확장된 파일시스템 작업
- **handlebars**: 템플릿 엔진 (POM 파일 생성)

### 기존 패키지 활용
- **VS Code API**: 파일 다이얼로그, 워크스페이스 관리
- **React + TypeScript**: 프론트엔드 UI
- **VS Code UI Toolkit**: 네이티브 컴포넌트

## 🤝 기여

eGovFrame 통합 기능에 대한 개선사항이나 버그 리포트는 언제든 환영합니다. 특히 다음 영역에서 기여를 기다립니다:

- 새로운 프로젝트 템플릿 추가
- 코드 생성 템플릿 개선
- UI/UX 개선사항
- 성능 최적화
- 테스트 케이스 추가

---

*본 문서는 Cline Extension v3.17.5 기준으로 작성되었습니다.* 