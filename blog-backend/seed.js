require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./models/Post');

mongoose.connect(process.env.MONGO_URI);

const posts = [
  {
    title: "React ile Modern Blog Tasarımı",
    summary: "React ve modern CSS ile şık ve kullanıcı dostu bir blog ana sayfası nasıl yapılır? Adım adım rehber.",
    content: `React ile modern bir blog sitesi yapmak için öncelikle component yapısını planlamalısınız. Navbar, Home, Blog, Contact gibi ana bileşenleri oluşturun. Modern CSS ve animasyonlarla kullanıcı deneyimini artırın. Blog yazılarını backend'den dinamik olarak çekin. Yorum sistemi ekleyin ve kullanıcı etkileşimini artırın.\n\n**Adımlar:**\n1. Proje yapısını planlayın.\n2. Bileşenleri oluşturun.\n3. Responsive ve animasyonlu tasarım ekleyin.\n4. Backend ile veri alışverişi kurun.\n5. SEO ve performans optimizasyonu yapın.\n\nDaha fazlası için adım adım rehberimizi takip edin!`,
    image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80",
    author: "Serdar Şahin",
    category: "React"
  },
  {
    title: "Web'de Renk ve Tipografi Seçimi",
    summary: "Web projelerinde doğru renk ve font seçimi için pratik ipuçları ve örnekler.",
    content: `\
Renk ve tipografi, bir web sitesinin karakterini belirler. Doğru renk paleti ve font seçimiyle kullanıcıların dikkatini çekebilir, marka kimliğinizi güçlendirebilirsiniz.\n\n**Renk Seçimi:**\n- Ana ve yardımcı renkleri belirleyin.\n- Kontrast ve erişilebilirliğe dikkat edin.\n- Renk psikolojisini göz önünde bulundurun.\n\n**Tipografi:**\n- Başlık ve gövde metni için farklı fontlar kullanın.\n- Okunabilirlik için uygun boyut ve satır aralığı seçin.\n- Google Fonts gibi ücretsiz kaynaklardan yararlanın.\n\nBaşarılı bir web tasarımı için renk ve tipografi uyumuna mutlaka özen gösterin.\n`,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    author: "Serdar Şahin",
    category: "Tasarım"
  },
  {
    title: "Kariyer: Yazılımda İlk İşinizi Nasıl Bulursunuz?",
    summary: "Yeni mezunlar ve junior geliştiriciler için iş bulma sürecinde dikkat edilmesi gerekenler.",
    content: `Yazılım sektöründe ilk işinizi bulmak için teknik bilgi kadar iletişim ve network de önemlidir.\n\n**İpuçları:**\n- GitHub ve LinkedIn profilinizi güncel tutun.\n- Açık kaynak projelere katkı verin.\n- Kendi portföy sitenizi oluşturun.\n- Mülakatlara hazırlanın, algoritma ve veri yapıları çalışın.\n- Meetup ve konferanslara katılarak çevre edinin.\n\nUnutmayın, ilk işinizi bulmak sabır ve azim gerektirir. Kendinize güvenin ve sürekli öğrenmeye devam edin!`,
    image: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302b?auto=format&fit=crop&w=600&q=80",
    author: "Serdar Şahin",
    category: "Kariyer"
  },
  {
    title: "CSS Grid ile Responsive Tasarım",
    summary: "CSS Grid kullanarak esnek ve modern responsive web sayfaları nasıl yapılır? Pratik örneklerle anlatım.",
    content: `\
CSS Grid, modern web tasarımında esneklik ve düzen sağlar. Karmaşık grid yapıları kolayca oluşturabilirsiniz.\n\n**Başlangıç:**\n- display: grid ile grid alanı oluşturun.\n- grid-template-columns ve grid-template-rows ile satır ve sütunları tanımlayın.\n- Responsive için fr birimini ve media query'leri kullanın.\n\n**Örnek:**\n.container {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;\n  gap: 20px;\n}\n\nCSS Grid ile hem mobil hem masaüstü için harika düzenler oluşturabilirsiniz.\n`,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    author: "Serdar Şahin",
    category: "Tasarım"
  },
  {
    title: "React'ta State Yönetimi: useContext ve Redux Karşılaştırması",
    summary: "React projelerinde state yönetimi için useContext ve Redux'ın avantajları ve kullanım alanları.",
    content: `\
React projelerinde state yönetimi için farklı yaklaşımlar vardır. En popülerleri useContext ve Redux'tur.\n\n**useContext:**\n- Küçük ve orta ölçekli projelerde idealdir.\n- Kurulumu ve kullanımı kolaydır.\n- Performans için dikkatli kullanılmalı.\n\n**Redux:**\n- Büyük ve karmaşık projelerde tercih edilir.\n- Tüm uygulama state'ini merkezi olarak yönetir.\n- Middleware ve devtools desteğiyle gelişmiş özellikler sunar.\n\nProjenizin büyüklüğüne ve ihtiyaçlarına göre en uygun yöntemi seçmelisiniz.\n`,
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
    author: "Serdar Şahin",
    category: "React"
  },
  {
    title: "Yazılımda Networking ve Toplulukların Gücü",
    summary: "Yazılım dünyasında networking neden önemli? Topluluklara katılmanın kariyerine katkısı.",
    content: `\
Networking, yazılım kariyerinde fırsatları artırır ve yeni şeyler öğrenmeni sağlar.\n\n**Neden Önemli?**\n- İş ve staj fırsatları bulabilirsin.\n- Mentorluk ve destek alabilirsin.\n- Yeni teknolojileri ve trendleri takip edebilirsin.\n\n**Nasıl Yapılır?**\n- Meetup, konferans ve hackathonlara katıl.\n- Online topluluklarda (Discord, Slack, forumlar) aktif ol.\n- Açık kaynak projelere katkı ver.\n\nUnutma, güçlü bir network kariyerinde fark yaratır!\n`,
    image: "https://images.unsplash.com/photo-1465101053361-763ab02bced9?auto=format&fit=crop&w=600&q=80",
    author: "Serdar Şahin",
    category: "Kariyer"
  },
  {
    title: "Frontend'de Performans Optimizasyonu",
    summary: "Web sitenizi hızlandırmak için uygulayabileceğiniz en iyi performans optimizasyon teknikleri.",
    content: `\
Performans, kullanıcı deneyimi için kritik öneme sahiptir. Hızlı yüklenen bir site daha fazla kullanıcıyı elde tutar.\n\n**İpuçları:**\n- Görselleri optimize edin ve lazy loading kullanın.\n- Kodunuzu minify ve bundle edin.\n- Gereksiz kütüphaneleri kaldırın.\n- CDN kullanarak statik dosyaları hızlı sunun.\n- React'ta memoization ve code splitting uygulayın.\n\nPerformans odaklı geliştirme, SEO ve kullanıcı memnuniyetini artırır.\n`,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    author: "Serdar Şahin",
    category: "React"
  },
  {
    title: "Tasarımda Minimalizm: Az ile Çok Etki",
    summary: "Minimalist tasarımın temel prensipleri ve etkili bir kullanıcı deneyimi için ipuçları.",
    content: `\
Minimalist tasarım, sadelik ve işlevselliği ön plana çıkarır. Kullanıcıyı yormadan mesajınızı iletmenizi sağlar.\n\n**Prensipler:**\n- Gereksiz öğeleri kaldırın.\n- Boşlukları (white space) etkili kullanın.\n- Sade renk paletleri ve tipografi tercih edin.\n- Net ve anlaşılır bir hiyerarşi oluşturun.\n\nMinimalizm ile hem estetik hem de kullanıcı dostu arayüzler tasarlayabilirsiniz.\n`,
    image: "https://images.unsplash.com/photo-1465101070309-c9c7a3b7e8a5?auto=format&fit=crop&w=600&q=80",
    author: "Serdar Şahin",
    category: "Tasarım"
  }
];

async function seed() {
  await Post.deleteMany({});
  await Post.insertMany(posts);
  console.log("Örnek blog yazıları eklendi!");
  mongoose.disconnect();
}

seed(); 