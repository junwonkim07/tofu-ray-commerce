#!/bin/bash
set -e

APP_DIR="/home/deploy/tofu-ray-commerce"
cd "$APP_DIR"

echo "========================================"
echo "🔍 확인 단계"
echo "========================================"

echo "📍 현재 디렉토리: $(pwd)"
echo "👤 현재 사용자: $(whoami)"

echo -e "\n📋 최신 커밋:"
git log --oneline -3

echo -e "\n🐳 Docker 컨테이너 상태:"
docker compose -f docker-compose.prod.yml ps

echo -e "\n📝 webhook 서비스 로그 (최근 20줄):"
docker compose -f docker-compose.prod.yml logs webhook --tail 20 2>/dev/null || echo "❌ webhook 로그를 읽을 수 없음"

echo -e "\n🔧 nginx 설정 확인:"
docker compose -f docker-compose.prod.yml exec proxy nginx -t 2>/dev/null && echo "✅ nginx 설정 OK" || echo "❌ nginx 설정 오류"

echo -e "\n========================================"
echo "🚀 강제 배포 단계"
echo "========================================"

# 최신 코드 pull
echo "📥 최신 코드 가져오기..."
git fetch origin main
git reset --hard origin/main

# .env.production 백업 및 복원
echo "💾 .env.production 처리..."
if [ -f .env.production ]; then
  cp .env.production .env.production.backup
  echo "✅ .env.production 백업됨"
fi

# 강제 rebuild 및 restart
echo "🔄 Docker 컨테이너 재구성..."
docker compose --env-file .env.production -f docker-compose.prod.yml down --remove-orphans
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build --remove-orphans

# 대기
sleep 10

echo -e "\n✅ 배포 완료!"
echo -e "\n📊 최종 상태:"
docker compose -f docker-compose.prod.yml ps
