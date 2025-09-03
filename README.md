# 💖 쑨쑨배의 가타카나 공부 💖

일본어 가타카나 학습을 위한 인터랙티브 플래시카드 웹 애플리케이션입니다. OpenAI(GPT) API와 Vercel 서버리스 함수를 활용하여 사용자가 원하는 주제와 개수만큼 동적으로 단어 카드를 생성하여 학습할 수 있습니다.

**🔗 배포 주소:** [https://ssunbae-katakana-flashcards.vercel.app/](https://ssunbae-katakana-flashcards.vercel.app/)

---

[여기에 프로젝트 스크린샷을 넣어주세요]
---

## ## ✨ 프로젝트 스크린샷

<div style="display: flex; justify-content: center; align-items: flex-start; flex-wrap: wrap; gap: 20px;">
    <img src="https://github.com/user-attachments/assets/e1071533-0129-4a38-ab31-d7fb62790f25" alt="가타카나 플래시카드 메인 화면" style="width: 48%; min-width: 300px; max-width: 500px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
    <img src="https://github.com/user-attachments/assets/4a88d553-eb37-416f-bbd2-9164f74c23bc" alt="가타카나 플래시카드 설정 화면" style="width: 48%; min-width: 300px; max-width: 500px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
</div>

---
---

## ## ✨ 주요 기능

* **📇 3D 플래시카드:** 클릭 또는 Enter 키로 앞/뒷면을 뒤집는 3D 애니메이션 효과
* **🤖 AI 단어 생성:** 원하는 **주제**와 **개수**를 입력하면 GPT가 즉시 새로운 가타카나 단어 목록을 생성
* **🔊 음성 지원 (TTS):** Web Speech API를 통해 각 단어의 정확한 일본어 발음 듣기 기능
* **⭐ 즐겨찾기 시스템:** 중요한 단어를 즐겨찾기(⭐)에 추가하고, 즐겨찾기한 단어만 모아서 학습 가능
* **⚙️ 사용자 설정:**
    * 다양한 일본어 TTS 음성(Voice) 선택 가능 (브라우저별 최적화)
    * 가독성을 높이기 위한 일본어 웹 폰트 4종 지원
* **⌨️ 키보드 단축키:** `←`, `→` 키로 카드 이동, `Enter` 또는 `Space` 키로 카드 뒤집기 지원

---

## ## 🛠️ 기술 스택

* **Frontend:** React, TypeScript
* **UI:** Tailwind CSS, shadcn/ui
* **Backend:** Vercel Serverless Functions
* **APIs:** OpenAI GPT API, Web Speech API (Browser TTS)
* **Deployment:** Vercel

---

## ## 🚀 로컬에서 실행하기

1.  **저장소 복제**
    ```bash
    git clone [https://github.com/SsunLee/ssunbae_katakana-flashcards.git](https://github.com/SsunLee/ssunbae_katakana-flashcards.git)
    cd ssunbae_katakana-flashcards
    ```

2.  **의존성 설치**
    ```bash
    npm install
    ```

3.  **환경 변수 설정**
    * 프로젝트 루트에 `.env.local` 파일을 생성하고 아래 내용을 추가하세요.
    * `YOUR_OPENAI_API_KEY` 부분은 자신의 OpenAI API 키로 대체해야 합니다.
    ```
    OPENAI_API_KEY=YOUR_OPENAI_API_KEY
    ```

4.  **개발 서버 실행**
    ```bash
    vercel dev
    ```

5.  브라우저에서 `http://localhost:3000` 주소로 접속합니다.