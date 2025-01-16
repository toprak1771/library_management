import Redis from "ioredis";

let redis: Redis | null = null;

try {
  redis = new Redis();

  redis.on("connect", () => {
    console.log("Redis bağlantısı başarılı!");
  });

  redis.on("error", (err) => {
    console.error("Redis bağlantı hatası:", err);
    redis = null;
  });
} catch (error) {
  console.error("Redis başlatılırken bir hata oluştu:", error);
  redis = null; // Redis nesnesini null olarak ayarla
}

export default redis;