Backend read.me
projeyi klonla,
.env dosyası oluşturarak  DATABASE_URL="postgresql://username:password@localhost:5432/library?schema=public" ekle
npm i ile bağımlılıkları yükle
npx prisma migrate dev --name init ile migrations çıkarak tabloları oluştur
npx prisma db seed ile seed dataları database'e kaydet
bilgisayarına docker'ı yükleyerek çalıştır
projedeki dokcer-compose.yaml dosyasında tanımlanan redisi çalıştırmak için docker-compose up -d redis komutunu kullan.
Daha sonra npm run dev ile projeyi ayağa kaldır

Frontend projesi 3000 portunda ayağa kalktığı için backend'i 5000 olarak ayarladım.
Get isteklerindeki parametreleri query olarak post isteklerinde datayı ise body olarak aldım.

Get Users
localhost:5000/users adresine istek atarak userslar listelenir.

Get User
localhost:5000/users?id=4 ile query olarak aldığı id ile ilgili user getirilir.


Get Books
localhost:5000/books ile books'lar önce redis'de data varsa oradan getirilir eğer redis boş ise database'den redis doldurulur ve ardından books datası döndürülür.

Get Book
localhost:5000/books?id=5 ile önce redisde ilgili book datası var mı kontrol edilir, eğer varsa o getirilir, yoksa databaseden getirilerek redis'e de data kaydedilir.

Return Book
localhost:5000/users/return ile 
{
    "user_id":4,
    "book_id":1,
     "score": 8
}
body'si ile ilgili user'a ait book iade edilir ve hem redis hem database güncellenir. Gelen score datası ile kitabın score'ı tekrar hesaplanır. Eğer bu kitap şu anda bu kullanıcıda ödünç değilse backend hata mesajı veririr, bunu book tablosu status kolonuyla kontrol edilir.

Borrow Book
localhost:5000/users/borrow apisi ile ve 
{
    "user_id":4,
    "book_id":1
} gelen body ile ilgili user'a ilgili book ödünç verilir. Eğer bu kitap şu an dabir kullanıcı tarafındaysa backend hata mesajı yollar,bunu book tablosu status kolonuyla kontrol edilir.
