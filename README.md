# Ismail Samani

React va Vite yordamida tayyorlangan mobil veb-ilova prototipi.

## Ishga tushirish

```bash
npm install
npm run dev
npm run build
node --test tests/delivery-map.test.mjs
```

Vercel uchun `dist` build papkasi. Xarita Leaflet va OpenStreetMap asosida, API kaliti talab qilmaydi. Xaritaga bosib yoki belgini surib manzil tanlanadi; joriy joylashuv uchun HTTPS va foydalanuvchi ruxsati talab qilinadi. OpenStreetMap plitkalari internet talab qiladi va ularning [foydalanish siyosati](https://operations.osmfoundation.org/policies/tiles/)ga rioya qilish kerak; katta trafikda mos xarita provayderidan foydalaning.

## Buyurtmalar va backend

Loyihada hozircha backend, admin panel, kuryer interfeysi va haqiqiy to'lov mavjud emas. `VITE_ORDERS_API_URL` belgilanmagan bo'lsa, buyurtmalar faqat foydalanuvchi brauzerida namuna sifatida saqlanadi, hech kimga yuborilmaydi. Manzil ham brauzerda saqlanadi. Foydalanuvchi ma'lumotlarini umumiy qurilmada saqlashdan ehtiyot bo'ling.

Backend yaratilgach `VITE_ORDERS_API_URL` ni bir xil origin ostidagi buyurtma endpointiga, masalan `/api/orders` ga sozlab, qayta build qiling. Frontend POST JSON yuboradi: `id`, `createdAt`, `items` (id, name, qty, price, variant), `paymentMethod`, `baristaNote`, `subtotal`, `deliveryFee`, `total` va `delivery` (`location: {lat, lng}`, `apartment`, `entrance`, `floor`, `comment`). Endpoint muvaffaqiyatda JSON `{ "id": "server-buyurtma-id" }` va 2xx qaytarishi kerak; xatoda savatcha saqlanadi. Backend narxlarni qayta hisoblash, ma'lumotlarni tekshirish, takroriy yuborishni bartaraf etish, maxfiy ma'lumotlarni himoyalash va autentifikatsiya/avtorizatsiya uchun mas'ul. To'lov integratsiyasi alohida kerak.

`src/OrderLocation.jsx` kelajakdagi himoyalangan admin/kuryer buyurtma tafsilotlarida qayta ishlatilishi mumkin: koordinatalarni xaritada ko'rsatadi va Yandex/Google navigatsiya havolalarini yaratadi. Hozir u faqat shu brauzerdagi buyurtmalar tarixida ishlaydi; bu admin yoki kuryerga buyurtma yuborilganini anglatmaydi.

Manzil qidiruvi faqat foydalanuvchi “Qidirish” tugmasini bosganda OpenStreetMap Nominatim xizmatiga yuboriladi; qidiruv matni uchinchi tomon xizmatiga uzatiladi. Bu ommaviy servisning [foydalanish qoidalari](https://operations.osmfoundation.org/policies/nominatim/) va cheklovlari mavjud; katta hajmli foydalanish uchun alohida provayder yoki o'z serveringiz kerak. Joylashuv aniqlanishi foydalanuvchi ruxsati, qurilma sozlamalari va HTTPS'ga bog'liq; tanlangan mavjud manzil avtomatik GPS bilan almashtirilmaydi.

Xarita dizayni CARTO Voyager plitkalaridan foydalanadi, ular yuklanmasa OpenStreetMap standart xaritasiga qaytadi. Ikkala xizmat ham uchinchi tomon tarmoq xizmatlari; ishlab chiqarishda ularning foydalanish shartlari va trafik limitlarini tekshiring. Xaritani barmoq bilan siljitish va ikki barmoq bilan kattalashtirish mumkin; sahifani aylantirish uchun xaritadan tashqarida suring.
