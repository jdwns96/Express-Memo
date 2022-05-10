# express - template

## 구현목록

- session 을 이용한 로그인 처리
- sequlize
- 메모장 CRUD

## 설치 패키지

```
  npm i express # 익스프레스
  npm i morgan # 로그 기록
  npm i nodemon # 자동 재실행
  npm i cookie-parser # 쿠키 해석
  npm i express-session # 세션
  npm i dotenv # 설정파일
  npm i nunjucks # 템플릿 엔진
  npm i multer # 멀티파트 폼 데이터 (이미지)
  npm i pm2 # 배포시 사용하는 로그관리

  npm i bcrypt # 암호화
  npm i mysql2
  npm i sequelize sequelize-cli
```

## 실행

### 도커 mysql 실행

기본 앱은 로컬에서 실행하고
데이터 베이스만 도커를 이용하여 가상으로 띄워준다. 도커 설치 확인

```
#  docker-compose.yml
version: "3"
services:
  mysql:
    build: ./mysql
    restart: unless-stopped
    container_name: express-template
    ports:
      - "33306:3306"
    volumes:
      - ./mysql/mysql_data:/var/lib/mysql
      - ./mysql/sqls/:/docker-entrypoint-initdb.d/
    environment:
      MYSQL_ROOT_PASSWORD: 1234
      MYSQL_DATABASE: express
```

```
docker -v # 도커 설치확인

docker-compose up
docker-compose up --build # 재 실행

docker ps # 실행중인 컨테이너 확인

docker-compose down # 제거
```

### 앱 서버 실행

```
  npm run start
```
