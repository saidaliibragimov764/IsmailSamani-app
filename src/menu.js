// Ismail Samani — расмiy menyu (Osh-Sofi restoran).
// Manba: restoran menyu fotosuratlari (2026). Nomlar va tavsiflar rus tilida aynan
// rasmlardagidek berilgan, o‘zbekcha tarjimasi bilan birga saqlanadi.
// Diqqat: menyuda narxi ko‘rsatilmagan taomlar ilovaga kiritilmagan.

import oshSofi from './assets/menu/osh-sofi.jpg';
import zigir from './assets/menu/zigir.jpg';
import chungara from './assets/menu/chungara.jpg';
import shurva from './assets/menu/shurva.jpg';
import olotSamsa from './assets/menu/olot-samsa.jpg';
import quailEggs from './assets/menu/quail-eggs.jpg';
import extraMeat from './assets/menu/extra-meat.jpg';
import dumba from './assets/menu/dumba.jpg';
import pay from './assets/menu/pay.jpg';
import ilik from './assets/menu/ilik.jpg';

export const SECTIONS = [
  {id: 'main', title: {uz: 'Asosiy taomlar', ru: 'Основные блюда'}, short: {uz: 'Asosiy taomlar', ru: 'Основные'}},
  {id: 'additions', title: {uz: "Asosiy taomlarga qo'shimchalar", ru: 'Добавки к основным блюдам'}, short: {uz: "Qo'shimchalar", ru: 'Добавки'}},
];

const v = (uz, ru, price) => ({label: {uz, ru}, price});

export const PRODUCTS = [
  // ——— Основные блюда ———
  {id: 1, num: 1, section: 'main',
   name: {uz: 'Osh-Sofi — Buxoro an’anaviy palovi', ru: 'Osh-Sofi Бухарский традиционный плов'},
   portion: {uz: '1 / 0.7 portsiya', ru: '1 / 0.7 порции'},
   variants: [v('1 portsiya', '1 порция', 45000), v('0.7 portsiya', '0.7 порция', 40000)],
   desc: {
     uz: 'Osh sofi — buxoro oshxonasining an’anaviy, parhez taomi bo‘lib, go‘sht, guruch va sabzi ko‘pincha alohida pishirilib, dasturxonda birlashtirilishi bilan boshqa palovlardan ajralib turadi. Bu palov qadimiy hisoblanadi va uning nomi buyuk tabib Abu Ali ibn Sino (Avitsenna) tomonidan berilgani aytiladi. Ayrim rivoyatlarga ko‘ra, asl nomi «palov osh» bo‘lgan va har bir harf mahsulotni anglatgan: П — piyoz, А — ayoz (sabzi), Л — lahm (go‘sht), О — oliyu (yog‘), В — ve (tuz), О — ob (suv), Ш — shali (guruch).',
     ru: 'Ош софи — это традиционное, диетическое блюдо бухарской кухни, которое отличается от других видов плова тем, что мясо, рис и морковь часто готовятся отдельно, а затем соединяются перед подачей. Этот вид плова является древним, и считается, что наименование плову дал великий врачеватель Абу Али ибн Сина (Авиценна). Согласно некоторым преданиям, изначальное название плова было «палов ош», и каждая буква этого названия определяет состав продуктов: П — пиёз (лук), А — аёз (морковь), Л — лахм (мясо), О — олию (жир), В — ве (соль), О — об (вода), Ш — шалы (рис).'},
   image: oshSofi, hit: true},

  {id: 2, num: 2, section: 'main',
   name: {uz: 'Zig‘ir palov', ru: 'Зигир плов'},
   portion: {uz: '1 portsiya', ru: '1 порция'},
   variants: [v('1 portsiya', '1 порция', 45000)],
   desc: {
     uz: 'Zig‘ir palov — maxsus zig‘ir yog‘ida tayyorlanadigan an’anaviy o‘zbek palovidir. Zig‘ir yog‘i (zig‘ir-yog‘) — O‘rta Osiyoning an’anaviy yog‘i bo‘lib, zig‘ir donasidan olinadi, ko‘pincha kunjut, paxta chigiti yoki qovun urug‘i qo‘shiladi. U taomga o‘ziga xos boy yong‘oq hidi, guruchning to‘q rangi va noyob quyuq ta’mni beradi. Zig‘ir palov Samarqand va Farg‘ona vodiysiga xos foydali hamda serto‘q palov hisoblanadi. Restoranimizda bu palov Samarqand oshpaxlik maktabi retsepti bo‘yicha tayyorlanadi.',
     ru: 'Зигир плов — это традиционный узбекский плов, приготовленный на особом зигирном масле. Зигирное масло (зигир-ёг) — это традиционное среднеазиатское масло, получаемое из семян льна, часто с добавлением кунжута, хлопковых семян или косточек дыни. Оно придаёт блюду специфический, насыщенный ореховый аромат, темноватый оттенок риса и уникальный вязкий вкус. Зигир плов считается полезным и очень сытным видом плова, характерным для Самарканда и Ферганской долины. В нашем ресторане этот плов готовится по рецепту Самаркандской школы кулинарии.'},
   image: zigir},

  {id: 3, num: 3, section: 'main',
   name: {uz: 'Chungara palov', ru: 'Чунгара плов'},
   portion: {uz: '1 portsiya / to‘liq', ru: '1 порция / полный'},
   variants: [v('1 portsiya', '1 порция', 55000), v('to‘liq (maxsus sho‘rva bilan)', 'полный (со специальным супом)', 70000)],
   desc: {
     uz: 'Chungara palov — bu nom avvalambor taomning nomidan ko‘ra, undan tayyorlanadigan Farg‘ona palovi uchun ishlatiladigan elita «chungara» guruch navining (devzira turi) nomidir. Chungara donalari zich va og‘ir bo‘lib, namlik va yog‘ni ko‘p singdiradi, lekin baribir sochilib qoladi va bo‘tqaga aylanmaydi. Bu palov turi Farg‘ona vodiysida (Qo‘qon, Rishton) mashhur bo‘lib, haqiqiy Farg‘ona palovi asosi hisoblanadi. Chungara palov asosan qo‘zi go‘shti va dumba bilan tayyorlanadi. Chungara palov — har kunlik taom emas, balki chinakorbilar uchun bayramona noyob taom: u nafaqat ta’mi, balki pishirish mahorati bilan ham baholanadi.',
     ru: 'Чунгара плов — это прежде всего название не столько самого блюда, сколько элитного сорта риса «чунгара» (разновидность девзиры), из которого готовят ферганский плов. Зёрна чунгары очень плотные и тяжёлые, они обильно впитывают влагу и жир, но при этом остаются рассыпчатыми и не развариваются в кашу. Этот вид плова популярен в Ферганской долине (Коканд, Риштан), считается основой настоящего ферганского плова. Чунгара плов в основном готовится с мясом баранины и курдюка. Чунгара плов — это не повседневное блюдо, а скорее праздничный шедевр для истинных ценителей, которые могут оценить не только вкус, но и мастерство приготовления.'},
   image: chungara, hit: true},

  {id: 4, num: 4, section: 'main',
   name: {uz: 'Achchiq sho‘rva «achchik shurva»', ru: 'Острый суп «аччик шурва»'},
   portion: {uz: '1 portsiya', ru: '1 порция'},
   variants: [v('1 portsiya', '1 порция', 15000)],
   desc: {
     uz: 'Achchiq sho‘rva — o‘zbek palovdan oldin tortiladigan an’anaviy achchiq bulon. Mohiyatan bu alohida taom emas, balki ishtahani «uyg‘otish» va ta’m retseptorlarini to‘yimli palovga tayyorlash uchun xizmat qiladigan achchiq qo‘shimchadir. Achchiq sho‘rva zirvak (palovning go‘sht-sabzavotli asosi) asosida tayyorlanadi, shuningdek jiza (qovurilgan dumba), achchiq murch va suzma qo‘shiladi. Bu taom Farg‘ona vodiysida ayniqsa mashhur.',
     ru: 'Острый суп — традиционный острый бульон, который подают перед узбекским пловом. По сути, это не отдельное блюдо, а скорее пикантное дополнение, призванное «разбудить» аппетит и подготовить вкусовые рецепторы к насыщенному жирному плову. Острый суп готовят на основе зирвака (мясо-овощной основы для плова), а также добавляют жизу (жареный курдюк), острый перец и сузьму. Это блюдо особенно популярно в Ферганской долине Узбекистана.'},
   image: shurva},

  {id: 5, num: 5, section: 'main',
   name: {uz: 'Olot somsa', ru: 'Олот самса'},
   portion: {uz: '1 dona', ru: '1 шт'},
   variants: [v('1 dona', '1 шт', 12000)],
   desc: {
     uz: 'Olot somsa — o‘zbek somsalarining mashhur turi bo‘lib, Buxoroning oshpazlik tashrifnomasi hisoblanadi. Nomi «Olot» (Alat) hududidan kelib chiqqan — aynan shu yerda o‘ylab topilgan. Olot somsa nihoyatda yupqa xamiridan tayyorlanadi; o‘ziga xosligi — maydalangan go‘sht, piyoz va yangi pomidorlardan iborat sersuv nachinka. Qatlami yo‘qligi bilan ajralib turadi, duxovkada oltin tusga kirguncha pishiriladi.',
     ru: 'Олот самса — это знаменитая разновидность узбекской самсы, которая является кулинарной визитной карточкой Бухары. Название она обрела из региона — «Алат», где её придумали. Олот самса готовится из тонкого пресного теста; особенностью является очень сочная начинка из рубленого мяса, лука и свежих помидоров. Она отличается отсутствием слоистости, выпекается в духовке до золотистой корочки.'},
   image: olotSamsa},

  // ——— Добавки к основным блюдам ———
  {id: 6, num: 6, section: 'additions',
   name: {uz: 'Bedana tuxumlari', ru: 'Перепелиные яйца'},
   portion: {uz: '1 dona', ru: '1 шт'},
   variants: [v('1 dona', '1 шт', 2000)], image: quailEggs},
  {id: 7, num: 7, section: 'additions',
   name: {uz: 'Qo‘shimcha go‘sht', ru: 'Дополнительное мясо'},
   portion: {uz: '50 gr', ru: '50 гр'},
   variants: [v('50 gr', '50 гр', 12000)], image: extraMeat},
  {id: 8, num: 8, section: 'additions',
   name: {uz: 'Dumba (qo‘zi dumba yog‘i)', ru: 'Курдюк (думба)'},
   portion: {uz: '50 gr', ru: '50 гр'},
   variants: [v('50 gr', '50 гр', 13000)], image: dumba},
  {id: 9, num: 9, section: 'additions',
   name: {uz: 'Mol payi (пай)', ru: 'Говяжьи сухожилия (пай)'},
   portion: {uz: '50 gr', ru: '50 гр'},
   variants: [v('50 gr', '50 гр', 13000)], image: pay},
  {id: 10, num: 10, section: 'additions',
   name: {uz: 'Ilik (suyak iligi)', ru: 'Костный мозг (илик)'},
   portion: {uz: '50 gr', ru: '50 гр'},
   variants: [v('50 gr', '50 гр', 13000)], image: ilik},
];

export const minPrice = p => Math.min(...p.variants.map(x => x.price));
