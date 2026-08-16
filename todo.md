# 댄서 상세페이지 영상 높이 조정 작업 목록

- [x] DancerPortfolio 컴포넌트에서 영상 컨늨라의 높이 제약을 찾았다..
- [x] 영상 원본 비율(세로 100%)에 맞쬌 aspect-ratio 또는 height 클래스를 조정했다.
- [x] 기존 반응형 레이아웃과 페이지 스크롤 없음 구조가 유지되는지 확인했다.
- [x] 빌드 검증을 수행하고 체크포인트를 저장했다.

## Claude 변경사항 동기화 확인

- [ ] 복구된 WebDev 프로젝트 경로와 현재 Git revision 확인
- [ ] GitHub connector/session 인증 상태 점검
- [ ] Claude 변경사항과 복구된 파일 비교
- [ ] LanguageSwitcher, HorizontalSlider, RoleSelectIntro, CaseStudy, tsconfig.json, .gitignore 누락 변경 적용
- [ ] 타입 체크와 프로덕션 빌드 실행
- [ ] 최신 미리보기 확인
- [ ] 체크포인트 저장 또는 GitHub 인증 차단 상황 보고

### 복구 메모

체크포인트 저장 중 샌드박스가 재설정되었고, WebDev가 `/home/ubuntu/portfolio-intro`를 `origin/main`의 `ffb8004b`에서 복구했습니다. 복구된 파일은 `/home/ubuntu/upload/.recovery/` 아래에 저장되었습니다.

## 메인 화면 LanguageSwitcher Cyan 테마

- [ ] 메인 화면의 LanguageSwitcher 기본 테마를 Cyan으로 변경
- [ ] 로컬 빌드 및 화면 확인
- [ ] GitHub 커밋과 푸시

## 픽셀 아케이드 탐색 경험

- [ ] 기존 SideScrollSelect 캐릭터 전환 및 메뉴 이동 구조 점검
- [ ] 역할별 픽셀 캐릭터 및 아케이드 화면 자산 준비
- [ ] 캐릭터 선택 이후 픽셀 탐색 연출 강화
- [ ] 키보드 이동과 Enter 선택 동선 검증
- [ ] GitHub 커밋과 푸시

## 치비 스프라이트와 아케이드 로비

- [ ] 디자이너·댄서 치비 캐릭터의 idle·walk·jump 자산 생성
- [ ] 메인 캐릭터 선택 화면을 게임 로비형 HUD로 개편
- [ ] 역할별 세부 팔레트와 상태 애니메이션 적용
- [ ] 키보드·마우스 전환과 시각 대비 검증
- [ ] GitHub 커밋과 푸시

## 역할 기반 테마·오디오·스토리지 마무리

- [x] 선택한 역할을 전역 상태로 보존하고 포트폴리오·프로젝트 화면의 팔레트를 자동 전환
- [x] 역할별 아카이브 배경음악과 hover·선택·이동 효과음을 연결
- [x] `client/public/manus-storage`의 대용량 이미지를 Web File Storage로 이전하고 참조를 교체
- [x] 프로덕션 빌드와 캐릭터 선택·스프라이트·테마 전환·라이트박스 동작을 브라우저에서 검증
- [x] GitHub 동기화 및 WebDev 체크포인트 저장

## 모바일 터치 게임패드

- [x] 하단 터치 D-pad와 점프·선택 버튼을 기존 이동 상태에 연결
- [x] 버튼별 터치 시작·종료·취소 동작과 효과음 연동
- [x] 모바일 화면에서 안전 영역·시각 대비·메뉴 선택 동작 검증
- [x] 체크포인트 저장과 GitHub 동기화
